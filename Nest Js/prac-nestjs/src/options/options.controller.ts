import { Body, Controller, Post } from '@nestjs/common';
import { OptionsDto } from './dto/options.dto';
import { OptionsService } from './options.service';
import { QuestionService } from 'src/question/question.service';

@Controller('options')
export class OptionsController {
  constructor(
    private readonly optionsService: OptionsService,
    private readonly questionService: QuestionService,
  ) {}
  @Post()
  async createOptions(@Body() optionsDto: OptionsDto) {
    const question = await this.questionService.findQuestionById(
      optionsDto.questionsId,
    );
    if (!question) {
      // If not used, this will give error
      throw new Error('Question not found');
    }
    return this.optionsService.createOptions(optionsDto, question);
  }
}
