import { Injectable } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/question.entity';
import { Quiz } from 'src/quiz/entity/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
  findQuestion() {
    return this.questionRepository.find({ relations: ['options'] });
  }
  findQuestionById(id: number) {
    return this.questionRepository.findOne({
      where: { id },
      relations: ['options'],
    });
  }
  async createQuestion(questionDto: QuestionDto, quiz: Quiz) {
    return await this.questionRepository.save({
      question: questionDto.question,
      quiz: quiz, // If we dont pass this, then quizId will be null
    });
  }
}
