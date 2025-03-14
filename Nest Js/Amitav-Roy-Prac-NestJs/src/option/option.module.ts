import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entity/option.entity';
import { QuestionModule } from 'src/question/question.module';
import { Question } from 'src/question/entity/question.entity';
import { QuestionService } from 'src/question/question.service';

@Module({
  controllers: [OptionController],
  providers: [OptionService, QuestionService],
  imports: [TypeOrmModule.forFeature([Option, Question]), QuestionModule],
})
export class OptionModule {}
