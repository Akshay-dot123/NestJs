import { Question } from 'src/question/entity/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Question, (question) => question.quiz, {
    onDelete: 'CASCADE',
  })
  questions: Question[];
}
