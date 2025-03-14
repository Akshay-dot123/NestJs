import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuizInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
