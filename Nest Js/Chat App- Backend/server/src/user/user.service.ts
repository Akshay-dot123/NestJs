/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Room } from 'src/room/entities/room.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}
  // async create(data) {
  //   const { username, password, room } = data;
  //   const existingUser = await this.userRepository.findOne({
  //     where: { username },
  //   });
  //   if (existingUser) {
  //     return existingUser.password === password;
  //   }
  //   const newUser = this.userRepository.create({ username, password });
  //   const savedUser = await this.userRepository.save(newUser);
  //   const newRoomUser = this.roomRepository.create({
  //     room_name: room,
  //     user: savedUser,
  //   });
  //   return await this.roomRepository.save(newRoomUser);
  // }

// New code working fine.. Can check once if needed
  async create(data) {
    const { username, password, room } = data;
    let user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      if (user.password !== password) {
        return false;
      }
    } else {
      const newUser = this.userRepository.create({ username, password });
      user = await this.userRepository.save(newUser);
    }

    // Check if user already in the room
    const existingRoomUser = await this.roomRepository.findOne({
      where: {
        room_name: room,
        user: { id: user.id },
      },
      relations: ['user'],
    });

    if (existingRoomUser) {
      return existingRoomUser; // or return a message like "User already in room"
    }

    const newRoomUser = this.roomRepository.create({
      room_name: room,
      user: user,
    });

    return await this.roomRepository.save(newRoomUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string) {
    return await this.userRepository.findOne({where:{username}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
