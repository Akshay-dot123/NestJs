import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  create(project: CreateProjectInput): Promise<Project> {
    const proj = this.projectRepository.create(project);
    return this.projectRepository.save(proj);
  }

  findAll() {
    return this.projectRepository.find({
      relations: ['employees'],
    });
  }

  findOne(id: number) {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['employees'],
    });
  }

  update(id: number, updateProjectInput: UpdateProjectInput) {
    const project = this.projectRepository.create(updateProjectInput);
    project.id = id;
    return this.projectRepository.save(project);
  }

  async remove(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new Error('Project not found');
    }
    return this.projectRepository.remove(project);
  }
}
