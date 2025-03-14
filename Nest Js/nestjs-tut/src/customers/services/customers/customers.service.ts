import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';

@Injectable()
export class CustomersService {
  users = [
    {
      id: 1,
      email: 'ak@gmailcom',
      name: 'Akshay',
    },
    {
      id: 2,
      email: 'prabhu@gmail.com',
      name: 'Prabhu',
    },
  ];
  findAllCustomer() {
    return this.users;
  }
  findByCustomerId(id: number) {
    return this.users.find((user) => user.id === id);
  }
  createCustomer(customerDto: CreateCustomerDto) {
    this.users.push(customerDto);
    console.log(customerDto);
    return this.users;
  }
}
