import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, LoginUserInput } from 'src/user/dto/create-user.input';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GqlAuthGuard } from './local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  //   @UseGuards(AuthGuard('local'))  //  This method does not work for graphql-nestjs configuration
  @UseGuards(GqlAuthGuard)
  @Query(() => String, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginUserInput,
    @Context() context,
  ) {
    console.log('Runs last');
    // return context.req.user;

    const user = context.req.user;
    console.log(user);
    const accessToken = await this.authService.login(user);
    const res: Response = context.res;
    res.cookie('token',accessToken)
    console.log(accessToken);
    return 'Login Successful';
  }
}
