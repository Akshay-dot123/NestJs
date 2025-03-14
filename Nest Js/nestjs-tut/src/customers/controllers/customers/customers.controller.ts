import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get('')
  getCustomer() {
    return this.customerService.findAllCustomer();
  }
  @Get(':id')
  getCustomerByID(
    // id,req,res re parameter name and @Req,@Res etc are decorators
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = this.customerService.findByCustomerId(id);
    if (customer) {
      // res.send(customer);
      return customer;
    } else {
      res.status(400).send('Customer Not Found');
    }
  }

  // Instead of writing req,res in above code.. We can simply write like below
  @Get('/search/:id')
  searchCustomer(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customerService.findByCustomerId(id);
    if (customer) return customer;
    else throw new HttpException('Customer Not FOund!', HttpStatus.BAD_REQUEST);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto);
    this.customerService.createCustomer(createCustomerDto);
  }
}
