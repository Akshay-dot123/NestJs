import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  courseId: string;
  // @Field(() => [Int], { nullable: true })
  // courseId: number[];
}
