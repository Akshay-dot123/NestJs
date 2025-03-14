import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Quiz {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  title: string;
  @Field()
  @Column()
  description: string;

  // This line is important
  @Field(() => [Question]) // <-- Add this decorator to indicate it's a list of Question types
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
