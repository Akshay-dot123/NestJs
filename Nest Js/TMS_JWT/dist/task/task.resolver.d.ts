import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput, UpdateTaskMemberInput } from './dto/update-task.input';
import { TaskUser } from './entities/task-user.entity';
export declare class TaskResolver {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(createTaskInput: CreateTaskInput, context: any): Promise<Task>;
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task | null>;
    updateTask(updateTaskInput: UpdateTaskInput, context: any): Promise<Task>;
    updateMemberTask(updateMemberTaskInput: UpdateTaskMemberInput): Promise<TaskUser>;
    deleteTaskUser(id: number, context: any): Promise<{
        id: number;
    }>;
}
