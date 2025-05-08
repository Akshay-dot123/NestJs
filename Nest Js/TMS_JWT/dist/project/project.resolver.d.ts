import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { JwtService } from '@nestjs/jwt';
import { PubSub } from 'graphql-subscriptions';
export declare class ProjectResolver {
    private readonly projectService;
    private readonly jwtService;
    private pubSub;
    constructor(projectService: ProjectService, jwtService: JwtService, pubSub: PubSub);
    createProject(createProjectInput: CreateProjectInput, context: any): Promise<Project | undefined>;
    findAll(): Promise<{
        completedPercentage: number;
        totalTasks: any;
        completedTasks: any;
        id: number;
        project_name: string;
        description?: string;
        created_by: number;
        updated_by: number;
        tasks: import("../task/entities/task.entity").Task[];
        users: import("../user/entities/user.entity").User[];
        userId: string;
    }[]>;
    findOne(id: number, context: any): Promise<{
        completedPercentage: number;
        id: number;
        project_name: string;
        totalTasks?: number;
        completedTasks?: number;
        description?: string;
        created_by: number;
        updated_by: number;
        tasks: import("../task/entities/task.entity").Task[];
        users: import("../user/entities/user.entity").User[];
        userId: string;
    }>;
    updateProject(project: UpdateProjectInput, context: any): Promise<Project>;
    deleteProject(id: number, context: any): Promise<{
        id: number;
    }>;
    projectCreated(userId: number): import("graphql-subscriptions/dist/pubsub-async-iterable-iterator").PubSubAsyncIterableIterator<unknown>;
}
