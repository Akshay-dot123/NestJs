import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/question.entity';
import { questionsDto } from './dto/questions.dto';
import { Quiz } from 'src/quiz/entity/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly QuestionRepository: Repository<Question>,
  ) {}
  findQuestion() {
    return this.QuestionRepository.find({ relations: ['options'] });
  }
  async createNewQuestion(quizData: questionsDto, quiz: Quiz) {
    const newQuestion = await this.QuestionRepository.save({
      question: quizData.question,
      quiz: quiz, // If we dont pass this, then quizId will be null
    });
    return newQuestion;
  }
  findQuestionById(id: number) {
    return this.QuestionRepository.findOne({
      where: { id },
      relations: ['quiz', 'options'],
    });
  }
}
