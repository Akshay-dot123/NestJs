import { Project } from 'src/project/entities/project.entity';
import { TaskUser } from './task-user.entity';
export declare class Task {
    id: number;
    task_name: string;
    description?: string;
    created_by: number;
    updated_by: number;
    projectId: number;
    project: Project;
    taskUsers: TaskUser[];
}
