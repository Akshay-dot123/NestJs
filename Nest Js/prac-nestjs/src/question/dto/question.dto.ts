import { IsNotEmpty, IsNumber, IsString, Length}  from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  @IsNumber()
  quizId: number;

  @Length(3, 255)
  @IsString()
  question: string;
}
