import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @IsNotEmpty({ message: 'Project is required' })
  @Field()
  project_name: string;

  @Field({ nullable: true })
  description: string = 'Description';

  @Field(() => Int, { nullable: true })
  updated_by?: number;

  @Field()
  userId: string;
}
