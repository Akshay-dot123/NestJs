import { BadRequestException, Injectable } from '@nestjs/common';
import { OptionsDto } from './dto/options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Options } from './entity/options.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entity/question.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Options)
    private readonly optionsRepository: Repository<Options>,
  ) {}
  createOptions(optionsDto: OptionsDto, question: Question) {
    const existingCorrectOption = question.options.find(
      (option) => option.isCorrect === true,
    );
    if (question.options.length > 4) {
      throw new BadRequestException(
        'A question cannot have more than 4 options.',
      );
    }
    if (optionsDto.isCorrect === true && existingCorrectOption) {
      throw new BadRequestException(
        'Only one option can be marked as correct.',
      );
    }
    return this.optionsRepository.save({
      text: optionsDto.text,
      isCorrect: optionsDto.isCorrect,
      question: question, // If we dont pass this, then quizId will be null
    });
  }
}
