import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Project {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  project_name: string;

  // This field will not be stored in db because @Column() does not exists
  @Field(() => Float, { nullable: true })
  completedPercentage?: number;
  @Field(() => Float, { nullable: true })
  totalTasks?: number;
  @Field(() => Float, { nullable: true })
  completedTasks?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  created_by: number;

  @Field(() => Float, { nullable: true }) // Use Float type
  @Column({ type: 'float', default: 0 })
  updated_by: number;

  @OneToMany(() => Task, (task) => task.project)
  @Field(() => [Task])
  tasks: Task[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable() // It will create new relation table between project and user
  users: User[];
  userId: string;
}
