import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Task } from 'src/task/entities/task.entity';
export declare class ProjectService {
    private readonly projectRepository;
    private readonly userRepository;
    private readonly userService;
    constructor(projectRepository: Repository<Project>, userRepository: Repository<User>, userService: UserService);
    create(createProjectInput: CreateProjectInput, createrRole: any): Promise<Project | undefined>;
    validateAssignedUsers(userId: string, userRole: any): Promise<User[]>;
    findAll(): Promise<{
        completedPercentage: number;
        totalTasks: any;
        completedTasks: any;
        id: number;
        project_name: string;
        description?: string;
        created_by: number;
        updated_by: number;
        tasks: Task[];
        users: User[];
        userId: string;
    }[]>;
    findOne(id: number): Promise<{
        completedPercentage: number;
        id: number;
        project_name: string;
        totalTasks?: number;
        completedTasks?: number;
        description?: string;
        created_by: number;
        updated_by: number;
        tasks: Task[];
        users: User[];
        userId: string;
    }>;
    update(projectId: number, updateProjectInput: UpdateProjectInput, updaterRole: any): Promise<Project>;
    remove(id: number, removerRole: any): Promise<{
        id: number;
    }>;
}
