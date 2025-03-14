import { IsEmail } from 'class-validator';

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// Name of table that u want to specify
@Entity()
// We write extends keyword BaseEntity to have more methods to apply
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;
}
