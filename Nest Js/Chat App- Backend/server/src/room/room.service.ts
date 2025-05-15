import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}
  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  async findRoom(room: string) {
    return await this.roomRepository.findOne({ where: { room_name: room } });
  }

  // async findAllRoom(room: string) {
  //   return await this.roomRepository.find({where:{room_name:room},relations:['messages']})
  // }

  // Latest code:-
  // async findAllRoom(room_name: string) {
  //   const rooms = await this.roomRepository.find({
  //     where: { room_name },
  //     relations: ['messages', 'messages.user'],
  //   });

  //   const allMessages: {
  //     messageId: number;
  //     message: string;
  //     createdAt: Date;
  //     updatedAt: Date;
  //     userId: number;
  //     roomId: number;
  //   }[] = [];

  //   for (const room of rooms) {
  //     if (room.messages && room.messages.length > 0) {
  //       for (const message of room.messages) {
  //         const messageData = {
  //           messageId: message.id,
  //           message: message.message,
  //           createdAt: message.createdAt,
  //           updatedAt: message.updatedAt,
  //           userId: message.user?.id,
  //           roomId: room.id,
  //         };
  //         allMessages.push(messageData);
  //       }
  //     }
  //   }

  //   return allMessages;
  // }


  async findAllRoom(room_name: string) {
    const rooms = await this.roomRepository.find({
      where: { room_name },
      relations: ['messages', 'messages.user'],
    });
    const allMessages: {
      id: number;
      message: string;
      createdAt: Date;
      updatedAt: Date;
      user: {
        id: number;
        username: string;
      };
      room: {
        id: number;
        room_name: string;
      };
    }[] = [];
  
    for (const room of rooms) {
      if (room.messages && room.messages.length > 0) {
        for (const message of room.messages) {
          const messageData = {
            id: message.id,
            message: message.message,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
            user: {
              id: message.user.id,
              username: message.user.username,
            },
            room: {
              id: room.id,
              room_name: room.room_name,
            },
          };
          allMessages.push(messageData);
        }
      }
    }
  
    return allMessages;
  }
  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
