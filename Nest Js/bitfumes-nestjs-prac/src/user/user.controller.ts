import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  // Note:- providers can be injected into class through constructor
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.get();
  }
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }
  @Post()
  create(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.create(updateUserDto);
  }
  @Put('/:id')
  update(@Body() updateUserDto: UpdateUserDto, @Param() param: { id: number }) {
    return this.userService.update(updateUserDto, param);
  }
}
