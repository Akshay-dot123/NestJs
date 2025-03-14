import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  name: string;
  @Field()
  @Column()
  city: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Column()
  @Field()
  projectId: number;
  @ManyToOne(() => Project, (project) => project.employees, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
