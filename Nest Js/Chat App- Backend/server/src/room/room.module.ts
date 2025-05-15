import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';

@Module({
  controllers: [RoomController],
  exports: [RoomService],
    imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomService],
})
export class RoomModule {}
