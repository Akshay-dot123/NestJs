import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  create(createQuestionInput: CreateQuestionInput) {
    const question = this.questionRepository.create(createQuestionInput);
    return this.questionRepository.save(question);
  }

  findAll() {
    return this.questionRepository.find({ relations: ['options'] });
  }

  findOne(id: number) {
    return this.questionRepository.findOne({
      where: { id },
      relations: ['options'],
    });
  }

  update(id: number, updateQuestionInput: UpdateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
