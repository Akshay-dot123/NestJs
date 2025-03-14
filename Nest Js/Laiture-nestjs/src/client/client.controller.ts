/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Client } from 'src/Entities/Client';
import { Transactions } from 'src/Entities/Transaction';
// import { createQueryBuilder } from 'typeorm';

@Controller('client')
export class ClientController {
  // @Get()
  // getUsers() {
  //   return 'difsdf';
  // }
  // Method-1
  @Post()
  async CreateClient(@Body() body: any) {
    const { firstName, LastName, email } = body;
    // We write extends keyword BaseEntity to have more methods to apply over here
    const client = Client.create({
      first_name: firstName,
      last_name: LastName,
      email,
    });
    await client.save(); // Save the entity in the database
    console.log(client);
    return client;
  }

  // Method-2
  //   @Post()
  // async CreateUser(@Body() body: { firstName: string, LastName: string, email: string }) {
  //   const { firstName, LastName, email } = body; // Destructure correctly from @Body()
  //   const client = await Client.create({
  //     first_name: firstName,
  //     last_name: LastName,
  //     email,
  //   }).save(); // Save the created client instance to the DB.
  //   return client; // Returning the created client.
  // }

  @Post('/:id/transaction')
  async findByClientId(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    const { amount, type } = body;
    const client = await Client.findOne({ where: { id } });
    if (!client) {
      throw new HttpException('ClientId does not exists', 404);
    }
    const transaction = Transactions.create({
      amount,
      type,
      client,
    });
    await transaction.save();
    return 'Transaction created successfully';
  }

  @Delete('/:clientId')
  async deleteClientId(@Param('clientId', ParseIntPipe) clientId: number) {
    const client = await Client.delete(clientId);
    if (client.affected == 0) {
      throw new HttpException('ClientId does not exists', 404);
    } else {
      return { message: 'Client deleted successfully' };
    }
  }

  // fetching data
  @Get()
  async getClient() {
    // Method-1
    const clients = await Client.getRepository()
      .createQueryBuilder('client')
      .select('client.first_name')
      .getMany();
    // Method-2
    // const clients = await Client.getRepository().find({
    //   select: ['first_name'], // Array of fields you want to select
    // });
    console.log('clients========>', clients);
    return clients;
  }
}
