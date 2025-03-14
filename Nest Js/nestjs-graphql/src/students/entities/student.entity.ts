import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Student {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  name: string;
  @Field()
  @Column({
    unique: true,
  })
  email: string;
  @Field(() => [Course]) // Expose courses in GraphQL
  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable()
  courses: Course[];
}
