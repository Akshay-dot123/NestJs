import { ObjectType, Field } from '@nestjs/graphql';
import { Options } from 'src/options/entities/option.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity() // Table will not be created if you did not add this.
export class Question {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Field()
  question: string;

  @Column()
  @Field()
  quizId: number;
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => Options, (option) => option.question)
  @Field(() => [Options]) // Exposing the options array to GraphQL
  options: Options[];
}
