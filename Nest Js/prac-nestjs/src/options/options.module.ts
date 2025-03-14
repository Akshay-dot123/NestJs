import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { Options } from './entity/options.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entity/question.entity';

@Module({
  providers: [OptionsService, QuestionService],
  controllers: [OptionsController],
  imports: [TypeOrmModule.forFeature([Options, Question])],
})
export class OptionsModule {}
