import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { QuizDto } from './dto/quiz.dto';
import { QuizService } from './quiz.service';
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Get()
  getQuiz() {
    return this.quizService.getQuiz();
  }
  @Get('/:id')
  getQuizById(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.getQuizByid(id);
  }
  @Post()
  createQuiz(@Body() quizDto: QuizDto) {
    return this.quizService.createQuiz(quizDto);
  }
}
