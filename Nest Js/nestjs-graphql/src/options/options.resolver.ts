import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { Options } from './entities/option.entity';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { QuestionService } from 'src/question/question.service';

@Resolver(() => Options)
export class OptionsResolver {
  constructor(
    private readonly optionsService: OptionsService,
    private readonly questionService: QuestionService,
  ) {}

  @Mutation(() => Options)
  async createOption(
    @Args('createOption') createOptionInput: CreateOptionInput,
  ) {
    const question = await this.questionService.findOne(
      createOptionInput.questionId,
    );
    if (!question) {
      // If not used, this will give error
      throw new Error('Question not found');
    }
    return this.optionsService.create(createOptionInput, question);
  }

  @Query(() => [Options], { name: 'findAllOptions' })
  findAll() {
    return this.optionsService.findAll();
  }

  @Query(() => Options, { name: 'findByOptionsId' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.optionsService.findOne(id);
  }

  @Mutation(() => Options)
  updateOption(
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ) {
    return this.optionsService.update(updateOptionInput.id, updateOptionInput);
  }

  @Mutation(() => Options)
  removeOption(@Args('id', { type: () => Int }) id: number) {
    return this.optionsService.remove(id);
  }
}
