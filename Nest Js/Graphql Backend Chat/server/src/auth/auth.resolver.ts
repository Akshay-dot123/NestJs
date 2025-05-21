import { BadRequestException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateUserDto,
  LoginUserInput,
} from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GqlAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginResponse } from 'src/dto/loginResponse.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Mutation(() => LoginResponse, { name: 'login' })
  // @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginInput') loginInput: LoginUserInput,
    @Context() context,
  ) {
    console.log('Runs last');
    const accessToken = await this.authService.login(loginInput);
    const result = await this.userService.create(loginInput);
    console.log("result1=========>",result)
    if(result){
      console.log("result1=========>",result.room_name)
      const res: Response = context.res;
      console.log(accessToken);
      // res.cookie('token', accessToken);
      // return accessToken.access_token;
      // return result;
      return {
        access_token: accessToken.access_token,
        room_name:result.room_name,
        user: {
          id:result.user.id,
          username:result.user.username,
        },
      }
    }else{
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}

