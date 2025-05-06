import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}


// import { InputType, Field } from '@nestjs/graphql';
// import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// @InputType()
// export class CreateUserInput {
//   @IsNotEmpty({ message: 'Email is required' })
//   @IsEmail({}, { message: 'Invalid email' })
//   @Field()
//   email: string;
//   @Field()
//   @MinLength(4, { message: 'Password must be at least 4 characters long' })
//   password: string;
// }