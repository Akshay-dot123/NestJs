import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { questionsDto } from './dto/questions.dto';
import { QuestionService } from './question.service';
import { QuizService } from 'src/quiz/quiz.service';

@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
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
  async creatQuestion(@Body() questionsData: questionsDto) {
    const quiz = await this.quizService.getQuizById(questionsData.quizId);
    if (!quiz) { // If not used, this will give error
      throw new Error('Quiz not found');
    }
    return this.questionService.createNewQuestion(questionsData, quiz);
  }
}
