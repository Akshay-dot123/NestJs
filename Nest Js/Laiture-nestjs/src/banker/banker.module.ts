import { Module } from '@nestjs/common';
import { BankerService } from './banker.service';

@Module({
  providers: [BankerService]
})
export class BankerModule {}
