import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field()
  course: string;
}
