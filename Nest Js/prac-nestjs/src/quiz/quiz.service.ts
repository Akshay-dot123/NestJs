import { Injectable } from '@nestjs/common';
import { Quiz } from './entity/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizDto } from './dto/quiz.dto';
import { Question } from 'src/question/entity/question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}
  getQuiz() {
    return this.quizRepository.find({
      relations: ['questions', 'questions.options'],
    });
  }
  getQuizByid(id: number) {
    return this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
  }
  createQuiz(quizDto: QuizDto) {
    return this.quizRepository.save(quizDto);
  }
}
