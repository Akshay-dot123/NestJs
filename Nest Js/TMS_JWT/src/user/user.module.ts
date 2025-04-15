import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';

@Module({
  providers: [UserResolver, UserService, ProjectService],
  imports: [TypeOrmModule.forFeature([User, Project])],
  exports: [UserService],
})
export class UserModule {}
