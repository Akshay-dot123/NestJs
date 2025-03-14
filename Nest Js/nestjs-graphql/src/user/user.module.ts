import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  providers: [UserResolver, UserService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
