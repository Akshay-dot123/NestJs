import { Injectable } from '@nestjs/common';
// import { CreateRoomDto } from './dto/create-room.dto';
// import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}
  // create(createRoomDto: CreateRoomDto) {
  //   return 'This action adds a new room';
  // }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  async findRoom(room: string) {
    return await this.roomRepository.findOne({ where: { room_name: room } });
  }
  async findUserRoom(room_name: string, userId: number) {
    return await this.roomRepository.findOne({
      where: {
        room_name,
        user: { id: userId },
      },
      relations: ['user'],
    });
  }

  // async findAllRoom(room: string) {
  //   return await this.roomRepository.find({where:{room_name:room},relations:['messages']})
  // }

  async findAllRoom(room_name: string) {
    const rooms = await this.roomRepository.find({
      where: { room_name },
      relations: ['messages', 'messages.user'],
    });
    const allMessages: {
      id: number;
      message: string;
      isDeleted: boolean;
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
            isDeleted: message.isDeleted,
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
    console.log("allMessages=========>",allMessages)
    return allMessages;
  }
  // update(id: number, updateRoomDto: UpdateRoomDto) {
  //   return `This action updates a #${id} room`;
  // }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
