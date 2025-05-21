import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageResolver } from './message.resolver';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { PubSubModule } from 'src/pubsub';

@Module({
  exports: [MessageService],
  imports: [TypeOrmModule.forFeature([Message, Room, User]), PubSubModule],
  providers: [MessageService, MessageResolver, RoomService, UserService],
})
export class MessageModule {}
