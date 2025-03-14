import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProjectResolver, ProjectService],
  imports: [TypeOrmModule.forFeature([Project])],
  exports: [ProjectService],
})
export class ProjectModule {}
