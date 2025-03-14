import { Injectable } from '@nestjs/common';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}
  create(createQuizInput: CreateQuizInput) {
    const quiz = this.quizRepository.create(createQuizInput);
    return this.quizRepository.save(quiz);
  }

  findAll() {
    return this.quizRepository.find({
      relations: ['questions', 'questions.options'],
    });
  }

  findOne(id: number) {
    return this.quizRepository.findOne({ where: { id } });
  }

  update(id: number, updateQuizInput: UpdateQuizInput) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
