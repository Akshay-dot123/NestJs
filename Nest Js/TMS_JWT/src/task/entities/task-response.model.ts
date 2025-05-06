// task-response.model.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskUser } from './task-user.entity';

@ObjectType()
export class TaskResponse {
  @Field(() => Task)
  savedTask: Task;

  @Field(() => [TaskUser])
  taskUsers: TaskUser[];
}
