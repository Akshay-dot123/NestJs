import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/utils/role-helper';
import { TaskUser } from './entities/task-user.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';

@Module({
  providers: [TaskResolver, TaskService, UserService, RoleService, ProjectService],
  imports: [TypeOrmModule.forFeature([Task, User, TaskUser, Project])],
})
export class TaskModule {}
