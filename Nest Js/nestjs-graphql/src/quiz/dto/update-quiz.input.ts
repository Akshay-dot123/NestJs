import { CreateQuizInput } from './create-quiz.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuizInput extends PartialType(CreateQuizInput) {
  @Field(() => Int)
  id: number;
}
