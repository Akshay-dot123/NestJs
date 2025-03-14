import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, Length } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateOptionInput {
  @IsNotEmpty({ message: 'Must contain Text bro!!!!' })
  @Length(3, 255, { message: 'Text must be between 3 and 255 characters.' })
  @Column()
  @Field()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  @Field()
  questionId: number;

  @IsBoolean()
  @Column()
  @Field()
  isCorrect: boolean;
}
