import {
  Body,
  Controller,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { Banker } from 'src/Entities/Banker';
import { Client } from 'src/Entities/Client';

@Controller('banker')
export class BankerController {
  @Post()
  async CreateBanker(@Body() body: any) {
    const { firstName, LastName, email, cardNumber, EmployeeNumber } = body; // Destructure correctly from @Body()
    const banker = await Banker.create({
      first_name: firstName,
      last_name: LastName,
      email,
      card_number: cardNumber,
      employee_number: EmployeeNumber,
    }).save(); // Save the created client instance to the DB.
    return banker; // Returning the created client.
  }

  // Mtehod-2 without DTO
  //   @Post()
  //   async createBanker(@Body() body: any) {
  //     // Manually map body to an instance of Banker
  //     const banker = new Banker();
  //     banker.first_name = body.firstName;
  //     banker.last_name = body.LastName;
  //     banker.email = body.email;
  //     const errors = await validate(banker);
  //     if (errors.length > 0) {
  //       throw new Error('Validation failed');
  //     }
  //     await banker.save();
  //     return banker;
  //   }

  // Connecting BankerId to ClientId
  @Put('/:bankerId/client/:clientId')
  async findByClientId(
    @Param('bankerId', ParseIntPipe) bankerId: number,
    @Param('clientId', ParseIntPipe) clientId: number,
    // @Body() body: any,
  ) {
    const client = await Client.findOne({ where: { id: clientId } });
    const banker = await Banker.findOne({ where: { id: bankerId } });
    if (!client || !banker) {
      throw new HttpException('ClientId or BankerId does not exists', 404);
    }
    banker.clients = [client];
    await banker.save();
    return 'Banker connected to client';
  }
}
