import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Room } from 'src/room/entities/room.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(data) {
    const { author, room, message } = data;
    // console.log('data ==========>', data);
    const findUser = await this.userRepository.findOne({
      where: { username: author },
    });
    if (!findUser) {
      throw new Error(`User with username '${author}' not found.`);
    }
    const findRoom = await this.roomRepository.findOne({
      where: {
        user: { id: findUser.id },
        room_name: room,
      },
      relations: ['user'],
    });
    if (!findRoom) {
      throw new Error(`Room '${room}' not found for user '${author}'.`);
    }
    const newMessage = this.messageRepository.create({
      message,
      room: findRoom,
      user: findUser,
    });
    const savedMessage=await this.messageRepository.save(newMessage);
    // console.log("message sent from ===========>", savedMessage)
    return savedMessage;
  }

  async findAll(id: string) {
    return await this.messageRepository.find({
      where: { room: { id: Number(id) } },
      relations: ['user'],
    });
  }

  findOne(id: string) {
    return this.messageRepository.findOne({
      where: { id: Number(id) },
      relations: ['user', 'room'],
    });
  }

  async update(id: string, body) {
    const updatedMessage = await this.messageRepository.update(id, {
      message: body.message,
    });
    return updatedMessage;
  }

  remove(id: string) {
    return `This action removes a #${id} message`;
  }
}
