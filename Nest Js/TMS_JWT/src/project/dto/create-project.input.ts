import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @IsNotEmpty({ message: 'Project is required' })
  @Field()
  @MinLength(3, { message: 'Project name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Project name must be at most 50 characters long' })
  project_name: string;

  @Field({ nullable: true })
  description: string = 'Description';

  @Field(() => Int, { nullable: true })
  updated_by?: number;

  @Field()
  userId: string;
}
