import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
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
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async validateAssignedUsers(
    userId: string,
    userRole: UserRole,
    projectId: number,
  ): Promise<User[]> {
    let users: User[] = [];

    if (userId) {
      // const assignedIds = userId
      //   .split(',')
      //   .map((id) => parseInt(id.trim(), 10));

      // users = await this.userRepository.find({
      //   where: { id: In(assignedIds) },
      // });

      const assignedIds = userId
        .split(',')
        .map((id) => id.trim())
        .filter((id) => /^\d+$/.test(id)) // Validate numeric strings
        .map((id) => Number(id)); // Convert to number after validation
      if (assignedIds.length === 0) {
        throw new NotFoundException(
          `Please insert valid existing Numeric UserId's`,
        );
      }
      users = await this.userRepository.find({
        where: { id: In(assignedIds) },
      });
      // console.log('number of users assigned', users);
      if (users.length === 0) {
        throw new NotFoundException('No valid People to be assigned found');
      }

      const project = await this.projectRepository.findOne({
        where: { id: projectId },
        relations: ['users'],
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      const projectUserIds = project.users.map((u) => u.id);
      const nonProjectUsers = users.filter(
        (u) => !projectUserIds.includes(u.id),
      );
      if (nonProjectUsers.length > 0) {
        throw new ForbiddenException(
          `Users [${nonProjectUsers.map((u) => u.id).join(', ')}] are not part of the project`,
        );
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