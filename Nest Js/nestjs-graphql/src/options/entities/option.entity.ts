import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Options {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field() //This is used to expose the property as a part of the GraphQL schema.
  @Column() // This is used to define fields in a database table
  isCorrect: boolean;
  @Field()
  @Column()
  text: string;
  @Field()
  @Column()
  questionId: number;
  @ManyToOne(() => Question, (question) => question.options)
  @Field(() => Question) // Exposing the question field to GraphQL
  // @JoinColumn({ name: 'questionsId' })  // If you want to change field_name in db
  question: Question;
}
