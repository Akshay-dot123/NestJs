import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { Employee } from './entity/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'src/project/project.module';

@Module({
  providers: [EmployeeService, EmployeeResolver],
  imports: [TypeOrmModule.forFeature([Employee]), ProjectModule],
})
export class EmployeeModule {}
