import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  get(): Promise<User[]> {
    return this.usersRepository.find();
  }
  show(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
  create(updateUserDto: UpdateUserDto) {
    return this.usersRepository.save(updateUserDto);
  }
  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
  update(updateUserDto: UpdateUserDto, param: { id: number }) {
    return this.usersRepository.update(param, updateUserDto);
  }
}
