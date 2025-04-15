import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Task_priority, Task_status } from '../entities/task.enums';
import { IsOptional } from 'class-validator';
@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field()
  id: number;

  @Field()
  task_name: string;

  @Field({ nullable: true })
  description?: string = 'Description';

  // @Field()
  // updated_by: number;

  @Field()
  userId: string;
}

@InputType()
export class UpdateTaskMemberInput {
  @Field()
  id: number;

  @Field(() => Task_status)
  task_status: Task_status;

  @Field(() => Task_priority)
  task_priority: Task_priority;

  @Field()
  updated_by: number; // They still need to be identified
}
