/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlJwtAuthGuard)
  me(@Context() context) {
    console.log("==================>",context.req.user);
    return context.req.user;
  }

  @Mutation(() => User)
  createUser(@Args('createUser') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'findByUserId' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => User)
  deleteUser(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any,
  ) {
    const userRole = context.req.user.role;
    console.log('User Deleting:', userRole);
    return this.userService.remove(id, userRole);
  }
}
