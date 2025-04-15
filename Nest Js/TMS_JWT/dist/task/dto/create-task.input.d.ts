import { Task_priority, Task_status } from '../entities/task.enums';
export declare class CreateTaskInput {
    task_name: string;
    description: string;
    projectId: number;
    updated_by?: number;
    userId: string;
    task_priority?: Task_priority;
    task_status?: Task_status;
}
