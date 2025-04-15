import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Task_priority, Task_status } from './task.enums';
export declare class TaskUser {
    id: number;
    task: Task;
    user: User;
    task_status: Task_status;
    task_priority: Task_priority;
}
