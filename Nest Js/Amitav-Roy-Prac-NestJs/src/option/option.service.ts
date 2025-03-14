import { Injectable } from '@nestjs/common';
import { Option } from './entity/option.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { optionsDto } from './dto/option.dto';
import { Question } from 'src/question/entity/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}
  createNewOption(optionData: optionsDto) {
    console.log(optionData);
    return this.optionRepository.save(optionData);
  }

  async createOption(optionData: optionsDto, question: Question) {
    const newOption = await this.optionRepository.save({
      text: optionData.text,
      isCorrect: optionData.isCorrect,
      question: question, // If we dont pass this, then questionId will be null
    });
    console.log(newOption);
    return newOption;
  }
}
