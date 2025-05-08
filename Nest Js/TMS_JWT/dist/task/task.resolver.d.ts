import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput, UpdateTaskMemberInput } from './dto/update-task.input';
import { TaskUser } from './entities/task-user.entity';
import { PubSub } from 'graphql-subscriptions';
import { UserService } from 'src/user/user.service';
export declare class TaskResolver {
    private readonly taskService;
    private readonly userService;
    private pubSub;
    constructor(taskService: TaskService, userService: UserService, pubSub: PubSub);
    createTask(createTaskInput: CreateTaskInput, context: any): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    findAllUserTask(context: any): Promise<TaskUser[]>;
    findUserTaskById(id: number): Promise<TaskUser | null>;
    findOne(id: number): Promise<Task | null>;
    updateTask(updateTaskInput: UpdateTaskInput, context: any): Promise<Task>;
    updateMemberTask(updateMemberTaskInput: UpdateTaskMemberInput, context: any): Promise<TaskUser>;
    deleteTaskUser(id: number, context: any): Promise<{
        id: number;
    }>;
    deleteTask(id: number, context: any): Promise<{
        id: number;
    }>;
    taskCreated(userId: number): import("graphql-subscriptions/dist/pubsub-async-iterable-iterator").PubSubAsyncIterableIterator<unknown>;
    taskUpdated(userId: number): import("graphql-subscriptions/dist/pubsub-async-iterable-iterator").PubSubAsyncIterableIterator<unknown>;
}
