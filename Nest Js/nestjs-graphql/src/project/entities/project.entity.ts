import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Project {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  name: string;
  // // Number is not graphql type so we are mapping this
  // @Field(() => Int)
  @Column()
  code: number;

  @OneToMany(() => Employee, (employee) => employee.project)
  @Field(() => [Employee], { nullable: true }) // We wont get employee details for every project if we dont use this line.
  employees: Employee[];
}
