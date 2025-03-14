import { InputType, Field } from '@nestjs/graphql';

@InputType() // Add the @InputType() decorator
export class EmployeeCreateDto {
  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  description: string;

  @Field()
  projectId: number;
}
