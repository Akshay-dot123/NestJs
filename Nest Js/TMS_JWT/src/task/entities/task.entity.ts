import {
  ObjectType,
  Field,
  Int,
  registerEnumType,
  Float,
} from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { TaskUser } from './task-user.entity';
import { Task_priority, Task_status } from './task.enums';
import { User } from 'src/user/entities/user.entity';

@Entity()
@ObjectType()
export class Task {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  task_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  created_by: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', default: 0 })
  updated_by: number;

  @Column()
  @Field()
  projectId: number;
  @Field(() => [User])
  users: User[];

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @Field(() => [TaskUser])
  @OneToMany(() => TaskUser, (taskUser) => taskUser.task)
  taskUsers: TaskUser[];
}
