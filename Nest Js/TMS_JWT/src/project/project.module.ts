import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { PubSubModule } from 'src/pubsub.module';

@Module({
  providers: [ProjectResolver, ProjectService, UserService],
  imports: [TypeOrmModule.forFeature([Project, User]), PubSubModule],
})
export class ProjectModule {}
