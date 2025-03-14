import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateQuestionInput {
  @Column()
  @Field()
  question: string;
  @Column()
  @Field()
  quizId: number;
}
