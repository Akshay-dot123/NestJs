import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Quiz } from './entity/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [QuizService],
  controllers: [QuizController],
  imports: [TypeOrmModule.forFeature([Quiz])],
})
export class QuizModule {}
