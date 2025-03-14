import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Options } from './entities/option.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Options)
    private readonly optionsRepository: Repository<Options>,
  ) {}
  create(createOptionInput: CreateOptionInput, question: Question) {
    const existingOptions = question.options;
    if (existingOptions.length >= 4) {
      throw new BadRequestException(
        'A question cannot have more than 4 options.',
      );
    }
    const existingCorrectOption = existingOptions.find(
      (option) => option.isCorrect === true,
    );
    if (createOptionInput.isCorrect === true && existingCorrectOption) {
      throw new BadRequestException(
        'Only one option can be marked as correct.',
      );
    }
    const options = this.optionsRepository.create(createOptionInput);
    return this.optionsRepository.save(options);
  }

  findAll() {
    return `This action returns all options`;
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  update(id: number, updateOptionInput: UpdateOptionInput) {
    return `This action updates a #${id} option`;
  }

  remove(id: number) {
    return `This action removes a #${id} option`;
  }
}
