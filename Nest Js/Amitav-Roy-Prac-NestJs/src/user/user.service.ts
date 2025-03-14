import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userDto: UserDto) {
    // Method-1
    // const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;

    // Method-2
    // const { confirm, ...userData } = userDto;
    // const user = this.userRepository.create({
    //   ...userData, // Spread the properties from userDto
    //   password: hashedPassword, // Set the hashed password
    // });
    return this.userRepository.save(user);
  }
  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
