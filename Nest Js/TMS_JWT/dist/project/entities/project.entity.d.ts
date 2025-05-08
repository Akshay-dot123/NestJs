import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Project {
    id: number;
    project_name: string;
    completedPercentage?: number;
    totalTasks?: number;
    completedTasks?: number;
    description?: string;
    created_by: number;
    updated_by: number;
    tasks: Task[];
    users: User[];
    userId: string;
}
