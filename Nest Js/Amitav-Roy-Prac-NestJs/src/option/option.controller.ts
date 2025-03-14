import { Body, Controller, Post } from '@nestjs/common';
import { OptionService } from './option.service';
import { QuestionService } from 'src/question/question.service';
import { optionsDto } from './dto/option.dto';

@Controller('question/option')
export class OptionController {
  constructor(
    private optionService: OptionService,
    private questionService: QuestionService,
  ) {}

  @Post()
  async saveOptionToquestion(@Body() createOption: optionsDto) {
    const question = await this.questionService.findQuestionById(
      createOption.questionsId,
    );
    console.log(question);
    if (!question) {
      throw new Error('Question not found');
    }
    await this.optionService.createOption(createOption, question);
    return { question, createOption };
  }
}
