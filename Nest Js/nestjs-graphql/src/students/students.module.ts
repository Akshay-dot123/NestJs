import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { CoursesService } from 'src/courses/courses.service';

@Module({
  providers: [StudentsResolver, StudentsService, CoursesService],
  imports: [TypeOrmModule.forFeature([Student, Course])],
})
export class StudentsModule {}
