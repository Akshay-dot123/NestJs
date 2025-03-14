import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field()
  email: string;
  @Field()
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
