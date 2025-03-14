import { Question } from 'src/question/entity/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Options {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}
