import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  // @IsNotEmpty({ message: 'Email is required' })
  // @IsEmail({}, { message: 'Invalid email' })
  @Field()
  email: string;
  // user?: StringConstructor;
}
