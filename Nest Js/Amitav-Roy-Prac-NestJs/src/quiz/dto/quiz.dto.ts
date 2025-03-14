import { IsNotEmpty, Length } from 'class-validator';
export class quizDto {
  @IsNotEmpty({ message: 'Quiz should have a title bro!!!!' })
  @Length(3, 255)
  title: string;

  @IsNotEmpty()
  description: string;
}
