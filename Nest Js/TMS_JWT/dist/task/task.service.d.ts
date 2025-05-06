import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { RoleService } from 'src/utils/role-helper';
import { UpdateTaskMemberInput } from './dto/update-task.input';
import { TaskUser } from './entities/task-user.entity';
import { Project } from 'src/project/entities/project.entity';
export declare class TaskService {
    private readonly taskRepository;
    private readonly taskUserRepository;
    private readonly userRepository;
    private readonly userService;
    private readonly roleService;
    private readonly projectRepository;
    constructor(taskRepository: Repository<Task>, taskUserRepository: Repository<TaskUser>, userRepository: Repository<User>, userService: UserService, roleService: RoleService, projectRepository: Repository<Project>);
    create(createTaskInput: CreateTaskInput, userRole: any): Promise<Task>;
    findAll(): Promise<Task[]>;
    findAllUserTask(userRole: any): Promise<TaskUser[]>;
    findUserTaskById(id: number): Promise<TaskUser | null>;
    findOne(id: number): Promise<Task | null>;
    updateAdminTlTask(id: number, UpdateTaskInput: UpdateTaskInput, userRole: any): Promise<Task>;
    updateMember(id: number, UpdateTaskMemberInput: UpdateTaskMemberInput, updater: any): Promise<TaskUser>;
    remove(id: number, removerRole: any): Promise<{
        id: number;
    }>;
    removeTask(id: number, removerRole: any): Promise<{
        id: number;
    }>;
}
