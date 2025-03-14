import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  Length,
} from 'class-validator';

export class OptionsDto {
  @IsNotEmpty({ message: 'Must contain question bro!!!!' })
  @Length(3, 255)
  text: string;

  @IsNotEmpty()
  @IsNumber()
  questionsId: number;

  @IsBoolean()
  isCorrect: boolean;
}
