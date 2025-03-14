import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // Reading query parameter (Don't pass anything inside query decorator if you want whole object in place of 'page' put empty)
  @Get()
  getQuery(
    @Query('page', new DefaultValuePipe(10), ParseIntPipe) page: number,
    @Query('') query: any,
  ) {
    console.log(query);
    console.log(page);
    // console.log(query.limit)  // This will also return value of given key named limit if exists
    return this.appService.getHello();
  }

  // Reading route parameter
  @Get(':id/:name/:gender')
  getuserId(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
  }
}
