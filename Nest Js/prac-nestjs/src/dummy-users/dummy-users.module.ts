import { Module } from '@nestjs/common';
import { DummyUsersController } from './dummy-users.controller';

@Module({
  controllers: [DummyUsersController]
})
export class DummyUsersModule {}
