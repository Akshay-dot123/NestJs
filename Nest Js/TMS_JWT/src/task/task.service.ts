/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { RoleService } from 'src/utils/role-helper';
import { UpdateTaskMemberInput } from './dto/update-task.input';
import { TaskUser } from './entities/task-user.entity';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskUser)
    private readonly taskUserRepository: Repository<TaskUser>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createTaskInput: CreateTaskInput, userRole: any) {
    if (userRole.role === 'ADMIN' || userRole.role === 'TEAM_LEAD') {
      const { projectId, task_name, userId, task_status, task_priority } =
        createTaskInput;
      const project = await this.projectRepository.findOne({
        where: { id: projectId },
      });
      if (!project) {
        throw new Error('Project does not exist');
      }
      const creatorId = project.created_by;
      const projectCreatedUser = await this.userService.findOne(creatorId);
      if (!projectCreatedUser) {
        throw new NotFoundException('User not found');
      }
      console.log('userRole===========>', userRole.role);
      console.log('User:', projectCreatedUser);
      // let projectId;
      if (
        userRole.role == 'ADMIN' ||
        (userRole.role == 'TEAM_LEAD' && projectCreatedUser.role == 'TEAM_LEAD')
      ) {
        const users = await this.roleService.validateAssignedUsers(
          userId,
          userRole,
          projectId,
        );
        if (!users) {
          throw new Error('Users do not exist');
        }

        // Create task (without status and priority)
        const task = this.taskRepository.create({
          projectId,
          task_name,
          created_by: userRole.id,
        });
        const savedTask = await this.taskRepository.save(task);
        // Assign task status and priority per user
        const taskUsers = users.map((user) =>
          this.taskUserRepository.create({
            task: savedTask,
            user: user,
            task_status,
            task_priority,
          }),
        );
        await this.taskUserRepository.save(taskUsers);
        return savedTask;
        // return {savedTask, taskUsers}
      } else {
        throw new Error('TL cannot assign tasks for Project created by Admin');
      }
    } else {
      throw new Error('Only TL and Admins can assign tasks');
    }
  }

  findAll() {
    return this.taskRepository.find();
  }

  async findAllUserTask(userRole: any) {
    console.log('userRole==>', userRole);
    const taskUsers = await this.taskUserRepository.find({
      relations: ['task', 'task.project', 'user'],
    });
    console.log('======>taskUsers', taskUsers);
    if (userRole.role == 'MEMBER') {
      const filteredTaskUsers = taskUsers.filter(
        (taskUser) => taskUser.user.id === userRole.id,
      );
      console.log('filteredTaskUsers========>', filteredTaskUsers);
      return filteredTaskUsers;
    } else {
      console.log('taskUsers====>', taskUsers);
      return taskUsers;
    }
  }

  async findUserTaskById(id: number) {
    // console.log('userRole==>', userRole);
    const taskUsers = await this.taskUserRepository.findOne({
      where: { id },
    });
    console.log('taskUsers=======>', taskUsers);
    return taskUsers;
  }

  findOne(id: number) {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['taskUsers'],
    });
  }

  // Note:- updateAdminTlTask id fetched from task table but updateMember id is fetched from task_user table.

  async updateAdminTlTask(
    id: number,
    UpdateTaskInput: UpdateTaskInput,
    userRole: any,
  ) {
    let projectId;
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const Creator = await this.userRepository.findOne({
      where: { id: task.created_by },
    });
    if (!Creator) {
      throw new NotFoundException('Creator not found');
    }
    console.log('Creator.role=========>', Creator.role);
    const { task_name, description, userId } = UpdateTaskInput;

    console.log('Updater.role=========>', userRole.role);
    if (
      (Creator.role == 'TEAM_LEAD' && userRole.role == 'TEAM_LEAD') ||
      userRole.role == 'ADMIN'
    ) {
      const users = await this.roleService.validateAssignedUsers(
        userId,
        Creator,
        projectId,
      );
      if (!users) {
        throw new Error('Users do not exist');
      }
      console.log('users==========>', users);
      task.task_name = task_name;
      task.description = description;
      task.updated_by = userRole.id;
      const savedTask = await this.taskRepository.save(task);
      await Promise.all(
        users.map(async (user) => {
          const existingTaskUser = await this.taskUserRepository.findOne({
            where: {
              task: savedTask,
              user: user,
            },
          });

          if (!existingTaskUser) {
            // Only create a new record if it doesn't already exist
            const taskUser = this.taskUserRepository.create({
              task: savedTask,
              user: user,
            });
            return await this.taskUserRepository.save(taskUser);
          }
          return existingTaskUser; // Return existing relation if found
        }),
      );
      return savedTask;
    } else {
      throw new UnauthorizedException(
        'Updater is not authorized to update this task',
      );
    }
  }

  async updateMember(
    id: number,
    UpdateTaskMemberInput: UpdateTaskMemberInput,
    updater: any,
  ) {
    const task = await this.taskUserRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    console.log('Updater.role=========>', updater.role);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // No need to fetch user separately - we already have it in the relation
    if (!task.user) throw new NotFoundException('Task owner not found');
    const { task_status, task_priority } = UpdateTaskMemberInput;
    // const updater = await this.userRepository.findOne({
    //   where: { id: updated_by },
    // });
    // if (!updater) {
    //   throw new NotFoundException('Updater not found');
    // }
    const canUpdate =
      task.user.role === 'MEMBER' ||
      (task.user.role === 'ADMIN' && updater.role === 'ADMIN') ||
      (task.user.role === 'TEAM_LEAD' && updater.role === 'ADMIN') ||
      (task.user.role === 'TEAM_LEAD' && updater.role === 'TEAM_LEAD');

    if (!canUpdate) {
      throw new UnauthorizedException(
        'Updater is not authorized to update this task',
      );
    }
    task.task_status = task_status;
    task.task_priority = task_priority;
    return await this.taskUserRepository.save(task);
  }

  async remove(id: number, removerRole: any) {
    const task = await this.taskUserRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) {
      throw new Error('Task not found');
    }
    const user = task.user;
    console.log('User.role=========>', user);
    const isAuthorized =
      task.user.role === 'MEMBER' ||
      (task.user.role === 'ADMIN' && removerRole === 'ADMIN') ||
      (task.user.role === 'TEAM_LEAD' && removerRole === 'ADMIN') ||
      (task.user.role === 'TEAM_LEAD' && removerRole === 'TEAM_LEAD');
    if (!isAuthorized) {
      throw new UnauthorizedException('Not authorized to remove this task');
    }
    const deletedTaskId = task.id;
    await this.taskUserRepository.remove(task);

    // Return object with required structure
    return { id: deletedTaskId };
  }

  async removeTask(id: number, removerRole: any) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new Error('Task not found');
    }
    const user = await this.userRepository.findOne({
      where: { id: task.created_by },
    });
    if (!user) {
      throw new Error('User not found');
    }
    console.log('Task created by user:', user.role);
    const isAuthorized =
      removerRole === 'ADMIN' ||
      (user.role === 'TEAM_LEAD' && removerRole === 'TEAM_LEAD');
    if (!isAuthorized) {
      throw new UnauthorizedException('Not authorized to remove this task');
    }
    const deletedTaskId = task.id;
    console.log('deletedTaskId========>', deletedTaskId);
    const a = await this.taskRepository.remove(task);
    console.log('=========>', a);
    // Return object with required structure
    return { id: deletedTaskId };
  }
}
