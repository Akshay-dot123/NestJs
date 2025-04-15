import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserInput: CreateUserInput) {
    if (createUserInput.role === Role.Admin) {
      // Use enum here
      const existingAdmin = await this.userRepository.findOne({
        where: { role: Role.Admin },
      });
      if (existingAdmin) {
        throw new ConflictException('Only one ADMIN user can exist');
      }
    }
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const user = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({ relations: ['projects'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['projects', 'projects.tasks'],
    });
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user || null;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number, removerRole: any) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User Id does not exist');
    }
    if (removerRole == 'ADMIN') {
      return this.userRepository.remove(user);
    } else {
      throw new UnauthorizedException('Not authorized to remove the User');
    }
  }
}
