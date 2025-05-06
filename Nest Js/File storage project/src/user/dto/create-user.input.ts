import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field()
  email: string;
  @Field()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;
  @Field(() => Role)
  @IsNotEmpty({ message: 'Role should be Admin or TL or Member ' })
  role: Role;
}
@InputType()
export class LoginUserInput {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field()
  email: string;
  @Field()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;
}
