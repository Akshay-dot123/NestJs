import { Injectable } from '@nestjs/common';
import { quizDto } from './dto/quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entity/quiz.entity';
import { Repository } from 'typeorm';
// import { Question } from 'src/question/entity/question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}
  async getAllQuiz() {
    // return await this.quizRepository.find()
    return await this.quizRepository
      .createQueryBuilder('q')
      // .leftJoinAndSelect(Question, 'qt', 'q.id=qt.quizId')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      // .take(1) // To display only 1 data
      .getMany();
  }

  createNewQuiz(quizData: quizDto) {
    return this.quizRepository.save(quizData);
  }
  getQuizById(id: number) {
    return this.quizRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }
}
