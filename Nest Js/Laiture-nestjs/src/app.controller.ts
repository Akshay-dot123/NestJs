import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  getUser() {
    return 'Hi Dude!!!!!!!!!';
  }
}
