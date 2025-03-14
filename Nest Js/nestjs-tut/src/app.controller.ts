import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { CustomersService } from './customers/services/customers/customers.service';

// We can import more than 1 service in constructor
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private customerService: CustomersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    // return this.customerService.findCustomer();
  }
}
