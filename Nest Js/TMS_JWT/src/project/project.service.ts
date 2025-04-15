import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { In } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
// import { RoleService } from 'src/utils/role-helper';

interface UserRole {
  role: string;
}

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async create(createProjectInput: CreateProjectInput, createrRole: any) {
    if (createrRole.role === 'ADMIN' || createrRole.role === 'TEAM_LEAD') {
      const { project_name, description, userId } = createProjectInput;
      // let users: User[] = [];
      // if (userId) {
      //   const assigned_ids = userId
      //     .split(',')
      //     .map((id) => parseInt(id.trim(), 10));
      //   users = await this.userRepository.find({
      //     where: { id: In(assigned_ids) },
      //   });
      //   if (users.length === 0) {
      //     throw new Error('No valid People to be assigned found');
      //   }
      //   if (user.role === 'TEAM_LEAD') {
      //     const isAssigningToAdmin = users.some(
      //       (assignedUser) => assignedUser.role === 'ADMIN',
      //     );
      //     if (isAssigningToAdmin) {
      //       throw new ForbiddenException(
      //         'TL cannot assign tasks to an Admin, please check userId',
      //       );
      //     }
      //   }
      // }
      // Below does not work for project module but works for task module, dont know the reason
      // const users = await this.roleService.validateAssignedUsers(userId, user);
      const users = await this.validateAssignedUsers(userId, createrRole.role);
      const project = this.projectRepository.create({
        project_name,
        description,
        created_by: createrRole.id,
        users,
      });
      return this.projectRepository.save(project);
    } else {
      throw new Error('Only TL or Admin can create Project for existing users');
    }
  }

  async validateAssignedUsers(userId: string, userRole: any): Promise<User[]> {
    let users: User[] = [];

    if (userId) {
      // const assignedIds = userId
      //   .split(',')
      //   .map((id) => parseInt(id.trim(), 10));

      const assignedIds = userId
        .split(',')
        .map((id) => id.trim())
        .filter((id) => /^\d+$/.test(id)) // Validate numeric strings
        .map((id) => Number(id)); // Convert to number after validation
      if (assignedIds.length === 0) {
        throw new NotFoundException(
          `Please insert valid existing Numeric UserId's`,
        );
      }

      users = await this.userRepository.find({
        where: { id: In(assignedIds) },
      });
      console.log('number of users assigned', users);
      if (users.length === 0) {
        throw new NotFoundException('No valid People to be assigned found');
      }
      if (userRole === 'TEAM_LEAD') {
        const isAssigningToAdmin = users.some(
          (assignedUser) => assignedUser.role === 'ADMIN',
        );
        if (isAssigningToAdmin) {
          throw new ForbiddenException(
            'TL cannot assign tasks to an Admin, please check userId',
          );
        }
      }
    }
    return users;
  }

  findAll() {
    return this.projectRepository.find({ relations: ['tasks'] });
  }

  // async findOne(id: number) {
  //   return this.projectRepository.findOne({
  //     where: { id },
  //     relations: ['tasks', 'tasks.taskUsers'],
  //   });
  // }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks', 'tasks.taskUsers'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const taskUsers = project.tasks.flatMap((task) => task.taskUsers);
    const totalTasks = taskUsers.length;
    const completedTasks = taskUsers.filter(
      (taskUser) => taskUser.task_status === 'Completed',
    ).length;

    const completedPercentage =
      totalTasks === 0 ? '0' : ((completedTasks / totalTasks) * 100).toFixed(2);
    console.log(`Percentage of Completed tasks: ${completedPercentage}%`);
    return {
      ...project,
      completedPercentage: parseFloat(completedPercentage),
    };
  }

  async update(
    projectId: number,
    updateProjectInput: UpdateProjectInput,
    updaterRole: any,
  ) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['users'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const user = await this.userService.findOne(project.created_by);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const { project_name, description, userId } = updateProjectInput;
    if (
      updaterRole.role == 'ADMIN' ||
      (updaterRole.role == 'TEAM_LEAD' && user.role == 'TEAM_LEAD')
    ) {
      console.log('userId========>', userId);
      console.log('Project created By============>', user.role);
      const users = await this.validateAssignedUsers(userId, updaterRole);
      project.project_name = project_name ?? project.project_name;
      project.description = description ?? project.description;
      project.updated_by = updaterRole.id;
      project.users = users.length > 0 ? users : project.users;
      return this.projectRepository.save(project);
    } else {
      throw new Error(
        'Admin can update all and TL can only updated their projects',
      );
    }
  }

  async remove(id: number, removerRole: any) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new Error('Project not found');
    }
    const projectCreator = project.created_by;
    const user = await this.userRepository.findOne({
      where: { id: projectCreator },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log("removerRole========>",removerRole)
    const isAuthorized =
      removerRole === 'ADMIN' ||
      (user.role === 'TEAM_LEAD' && removerRole === 'TEAM_LEAD');
    if (!isAuthorized) {
      throw new UnauthorizedException('Not authorized to remove this project');
    }
    const deletedProjectId = project.id;
    await this.projectRepository.manager.delete(Task, { project: { id } });
    await this.projectRepository.remove(project);
    return { id: deletedProjectId };
  }
}
