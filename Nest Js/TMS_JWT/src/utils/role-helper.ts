import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';

interface UserRole {
  role: string;
}

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateAssignedUsers(
    userId: string,
    userRole: UserRole,
  ): Promise<User[]> {
    let users: User[] = [];

    if (userId) {
      const assignedIds = userId
        .split(',')
        .map((id) => parseInt(id.trim(), 10));

      users = await this.userRepository.find({
        where: { id: In(assignedIds) },
      });

      if (users.length === 0) {
        throw new NotFoundException('No valid People to be assigned found');
      }

      if (userRole.role === 'TEAM_LEAD') {
        const isAssigningToAdmin = users.some(
          (assignedUser) => assignedUser.role === 'ADMIN',
        );
        if (isAssigningToAdmin) {
          throw new ForbiddenException(
            'TL cannot assign tasks to an Admin, please check userId',
          );
        }
      }
    }

    return users;
  }
}