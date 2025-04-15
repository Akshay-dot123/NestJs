import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { JwtService } from '@nestjs/jwt';
export declare class ProjectResolver {
    private readonly projectService;
    private readonly jwtService;
    constructor(projectService: ProjectService, jwtService: JwtService);
    createProject(createProjectInput: CreateProjectInput, context: any): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: number, context: any): Promise<{
        completedPercentage: number;
        id: number;
        project_name: string;
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
}
