import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  //   @UseGuards(AuthGuard('local'))  //  This method does not work for graphql-nestjs configuration
  @UseGuards(GqlAuthGuard)
  @Query(() => String, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: CreateUserInput,
    @Context() context,
  ) {
    console.log('Runs last');
    // return context.req.user;
    const user = context.req.user;
    const accessToken = await this.authService.login(user);
    console.log(accessToken);
    return accessToken.access_token;
  }
}
