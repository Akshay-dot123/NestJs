import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { userDto } from './dto/dummy-users.dto';
import { getUserParamDto } from './dto/get-dummy-user-param.dto';
import { updateUserDto } from './dto/update-dummy-user.dto';

@Controller('users')
export class DummyUsersController {
  // @Get(':total')   // This is not working
  // getUsers(@Param() param: getUserParamDto) {
  //   console.log(param);
  // }

  @Post()
  createUser(@Body() user: userDto) {
    console.log(user);
  }

  @Patch()
  updateUser(@Body() body: updateUserDto) {
    console.log(body);
  }
}
