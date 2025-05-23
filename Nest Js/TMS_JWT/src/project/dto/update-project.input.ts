import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateProjectInput } from './create-project.input';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(3, { message: 'Project name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Project name must be at most 50 characters long' })
  project_name?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @MinLength(3, { message: 'Description must be at least 3 characters long' })
  // description?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string = 'Description';

  @Field()
  userId: string;
}
