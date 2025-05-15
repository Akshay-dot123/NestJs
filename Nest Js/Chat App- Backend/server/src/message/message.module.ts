import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [MessageController],
  exports: [MessageService],
  imports: [TypeOrmModule.forFeature([Message, Room, User])],
  providers: [MessageService],
})
export class MessageModule {}
