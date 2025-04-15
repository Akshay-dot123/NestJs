import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Task_priority, Task_status } from './task.enums';

@Entity()
@ObjectType()
export class TaskUser {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.taskUsers, { onDelete: 'CASCADE' })
  @Field(() => Task)
  task: Task;

  @ManyToOne(() => User, (user) => user.taskUsers, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @Column({ type: 'enum', enum: Task_status, default: Task_status.To_Do })
  @Field(() => Task_status)
  task_status: Task_status;

  @Column({ type: 'enum', enum: Task_priority, default: Task_priority.Low })
  @Field(() => Task_priority)
  task_priority: Task_priority;
}
