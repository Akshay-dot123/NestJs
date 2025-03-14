import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  // New code not working at present
  async create(createStudentInput: CreateStudentInput) {
    const { name, email, courseId } = createStudentInput;
    const courseIds = courseId.split(',').map((id) => parseInt(id.trim(), 10));
    const courses = await this.courseRepository.findByIds(courseIds);
    if (courses.length === 0) {
      throw new Error('No valid courses found');
    }
    const student = this.studentRepository.create({ name, email, courses });
    return this.studentRepository.save(student);
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
