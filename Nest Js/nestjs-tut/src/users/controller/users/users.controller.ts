import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from '../../user.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('')
  getUsers() {
    return this.usersService.getUsers();
  }
  @Get('/:username')
  async getByUserName(@Param('username') username: string) {
    const user = await this.usersService.getUserByName(username);
    if (user) return { user };
    else throw new HttpException('Username Not FOund!', HttpStatus.BAD_REQUEST);
  }

  // @Post('create')
  // // @UsePipes(ValidationPipe)
  // async createUser(@Body() user: User) {
  //   // console.log("sadad",user);
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //   // return this.usersService.create(user);
  //   try {
  //     return await this.usersService.create(user);
  //   } catch (error) {
  //     throw new HttpException(
  //       'Error creating user',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Post('create')
  async createCustomer(@Body() createCustomer: User) {
    console.log('createCustomer=====>', createCustomer);
    return await this.usersService.create(createCustomer);
  }
}
