import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuestionModule } from 'src/question/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entity/quiz.entity';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [TypeOrmModule.forFeature([Quiz])],
})
export class QuizModule {}
