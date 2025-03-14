import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// Name of table that u want to specify
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
