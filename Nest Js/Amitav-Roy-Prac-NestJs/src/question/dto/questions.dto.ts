import { IsNotEmpty, IsNumber, Length } from 'class-validator';
export class questionsDto {
  @IsNotEmpty({ message: 'Must contain question bro!!!!' })
  @Length(3, 255)
  question: string;

  @IsNotEmpty()
  @IsNumber()
  quizId: number;
}
