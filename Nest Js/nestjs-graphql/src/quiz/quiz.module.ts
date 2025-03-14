import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';

@Module({
  providers: [QuizResolver, QuizService],
  imports: [TypeOrmModule.forFeature([Quiz])],
})
export class QuizModule {}
