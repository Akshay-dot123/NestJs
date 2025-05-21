import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomResolver } from './room.resolver';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  exports: [RoomService],
  imports: [TypeOrmModule.forFeature([Room, User])],
  providers: [RoomService, RoomResolver, UserService],
})
export class RoomModule {}
