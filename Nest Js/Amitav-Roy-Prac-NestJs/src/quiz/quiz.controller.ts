import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { quizDto } from './dto/quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}
  @Get()
  getAllQuiz() {
    return this.quizService.getAllQuiz();
  }
  @Post()
  @HttpCode(200)
  createQuiz(@Body() quizData: quizDto) {
    return this.quizService.createNewQuiz(quizData);
  }
  @Get('/:id')
  async getQuizId(@Param('id', ParseIntPipe) id: number) {
    return await this.quizService.getQuizById(id);
  }
}
