import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  code: number;
}
