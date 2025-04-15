import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { Task_priority, Task_status } from '../entities/task.enums';

@InputType()
export class CreateTaskInput {
  @IsNotEmpty({ message: 'Task is required' })
  @Field()
  task_name: string;

  @Field({ nullable: true })
  description: string = 'Description';

  @IsNotEmpty()
  @IsNumber()
  @Field()
  projectId: number;

  @Field(() => Int, { nullable: true })
  updated_by?: number;

  @Field()
  userId: string;

  @IsEnum(Task_priority, { message: 'Invalid task priority' })
  @Field(() => Task_priority, { nullable: true })
  task_priority?: Task_priority = Task_priority.Low; // Default value for task_priority

  @IsEnum(Task_status, { message: 'Invalid task status' })
  @Field(() => Task_status, { nullable: true })
  task_status?: Task_status = Task_status.To_Do;
}
