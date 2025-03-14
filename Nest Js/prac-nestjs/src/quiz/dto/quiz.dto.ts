import { IsString, Length } from 'class-validator';

export class QuizDto {
  @IsString()
  @Length(3, 255)
  title: string;

  @IsString()
  @Length(3, 255)
  description: string;
}
