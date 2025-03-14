import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeCreateDto } from './dto/create_employee.dto';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private projectService: ProjectService,
  ) {}
  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }
  create(employeeDto: EmployeeCreateDto): Promise<Employee> {
    const emp = this.employeeRepository.create(employeeDto);
    return this.employeeRepository.save(emp);
  }
  getProjectId(id: number) {
    return this.projectService.findOne(id);
  }
}
