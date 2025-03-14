import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiTokenPayment extends HttpException {
  constructor() {
    super('payment required', HttpStatus.PAYMENT_REQUIRED);
  }
}
