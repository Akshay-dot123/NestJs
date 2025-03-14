import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Course {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column({
    unique: true,
  })
  course: string;
  // @Field()
  // @Column()
  // studentId: number;
  @Field(() => [Student]) // Expose students in GraphQL
  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
}
