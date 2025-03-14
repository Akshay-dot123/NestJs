import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from './user.model';
@Module({
  imports: [SequelizeModule.forFeature([User])], // Registers the model with Sequelize
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
