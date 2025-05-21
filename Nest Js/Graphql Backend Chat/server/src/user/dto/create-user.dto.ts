import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @MinLength(2)
  username: string;

  @Field()
  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;

  @Field()
  @IsString()
  room: string;
}

@ObjectType()
export class UserOutput {
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  room: string;
}

@InputType()
export class LoginUserInput {
  @IsNotEmpty({ message: 'username is required' })
  @Field()
  @MinLength(2)
  username: string;
  @Field()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;
  @Field()
  room: string;
}
