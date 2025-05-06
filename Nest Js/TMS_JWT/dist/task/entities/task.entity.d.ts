import { Project } from 'src/project/entities/project.entity';
import { TaskUser } from './task-user.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Task {
    id: number;
    task_name: string;
    description?: string;
    created_by: number;
    updated_by: number;
    projectId: number;
    users: User[];
    project: Project;
    taskUsers: TaskUser[];
}
