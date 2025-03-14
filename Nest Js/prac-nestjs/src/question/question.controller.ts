import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';
import { QuestionService } from './question.service';
import { QuizService } from 'src/quiz/quiz.service';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly quizService: QuizService,
  ) {}
  @Get()
  findQuestion() {
    return this.questionService.findQuestion();
  }
  @Get('/:id')
  findQuestionById(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findQuestionById(id);
  }
  @Post()
  async createQuestion(@Body() questionDto: QuestionDto) {
    const quiz = await this.quizService.getQuizByid(questionDto.quizId);
    if (!quiz) {
      // If not used, this will give error
      throw new Error('Quiz not found');
    }
    return this.questionService.createQuestion(questionDto, quiz);
  }
}
