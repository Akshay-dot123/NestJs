import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { TaskUser } from 'src/task/entities/task-user.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  Check,
  Unique,
} from 'typeorm';

export enum Role {
  Admin = 'ADMIN',
  Team_lead = 'TEAM_LEAD',
  Member = 'MEMBER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The roles of a user in the system',
});

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Member })
  @Field(() => Role)
  role: Role;

  @Field(() => [Project])
  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];

  @Field(() => [TaskUser])
  @OneToMany(() => TaskUser, (taskUser) => taskUser.user)
  taskUsers: TaskUser[];
}
