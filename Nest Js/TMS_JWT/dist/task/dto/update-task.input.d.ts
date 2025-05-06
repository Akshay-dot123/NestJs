import { CreateTaskInput } from './create-task.input';
import { Task_priority, Task_status } from '../entities/task.enums';
declare const UpdateTaskInput_base: import("@nestjs/common").Type<Partial<CreateTaskInput>>;
export declare class UpdateTaskInput extends UpdateTaskInput_base {
    id: number;
    task_name: string;
    description?: string;
    userId: string;
}
export declare class UpdateTaskMemberInput {
    id: number;
    task_status: Task_status;
    task_priority: Task_priority;
}
export {};
