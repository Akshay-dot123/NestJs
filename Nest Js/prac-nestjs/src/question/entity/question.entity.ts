import { Options } from 'src/options/entity/options.entity';
import { Quiz } from 'src/quiz/entity/quiz.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => Options, (option) => option.question)
  options: Options[];
}
