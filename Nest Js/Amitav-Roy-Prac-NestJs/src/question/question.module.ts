import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question } from './entity/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from 'src/quiz/quiz.module';
import { Quiz } from 'src/quiz/entity/quiz.entity';
import { QuizService } from 'src/quiz/quiz.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, QuizService],
  imports: [TypeOrmModule.forFeature([Question, Quiz]), QuizModule],
})
export class QuestionModule {}
