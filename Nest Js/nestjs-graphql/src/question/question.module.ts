import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizService } from 'src/quiz/quiz.service';

@Module({
  providers: [QuestionResolver, QuestionService, QuizService],
  imports: [TypeOrmModule.forFeature([Question, Quiz])],
})
export class QuestionModule {}
