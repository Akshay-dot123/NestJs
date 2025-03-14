import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}

  @Mutation(() => Quiz)
  createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    return this.quizService.create(createQuizInput);
  }

  @Query(() => [Quiz], { name: 'findAllQuiz' })
  findAll() {
    return this.quizService.findAll();
  }

  @Query(() => Quiz, { name: 'findByQuizId' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.quizService.findOne(id);
  }

  @Mutation(() => Quiz)
  updateQuiz(@Args('updateQuizInput') updateQuizInput: UpdateQuizInput) {
    return this.quizService.update(updateQuizInput.id, updateQuizInput);
  }

  @Mutation(() => Quiz)
  removeQuiz(@Args('id', { type: () => Int }) id: number) {
    return this.quizService.remove(id);
  }
}
