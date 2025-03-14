import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';

@Module({
  providers: [CoursesResolver, CoursesService, StudentsService],
  imports: [TypeOrmModule.forFeature([Course, Student])],
  exports: [CoursesService],
})
export class CoursesModule {}
