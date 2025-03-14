import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiTokenPayment } from 'src/exceptions/api-token.exceptions';

export class ApiTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-token'] !== 'my-token') {
      throw new BadRequestException('Token does not match');
      //   throw new HttpException('My response', HttpStatus.PAYMENT_REQUIRED)
      throw new ApiTokenPayment();
    }
    next();
  }
}
