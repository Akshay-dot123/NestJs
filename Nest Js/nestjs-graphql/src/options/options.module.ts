import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsResolver } from './options.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Options } from './entities/option.entity';
import { Question } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';

@Module({
  providers: [OptionsResolver, OptionsService, QuestionService],
  imports: [TypeOrmModule.forFeature([Options, Question])],
})
export class OptionsModule {}
