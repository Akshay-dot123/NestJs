import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Employee } from './entity/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeCreateDto } from './dto/create_employee.dto';
import { Project } from 'src/project/entities/project.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}
  // To avoid conflict we name files like {name:"getAllEmployees"}
  @Query(() => [Employee], { name: 'getAllEmployees' })
  findAll() {
    return this.employeeService.findAll();
  }
  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employee') employee: EmployeeCreateDto) {
    return this.employeeService.create(employee);
  }

  @ResolveField(() => Project)
  // Name should be same as word 'project' used in employee entity
  project(@Parent() employee: Employee) {
    return this.employeeService.getProjectId(employee.projectId);
  }
}
