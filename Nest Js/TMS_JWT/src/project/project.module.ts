import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ProjectResolver, ProjectService, UserService],
  imports: [TypeOrmModule.forFeature([Project, User])],
})
export class ProjectModule {}
