import { Field, ObjectType } from '@nestjs/graphql';
import { Room } from 'src/room/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType() 
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Room])
  @OneToMany(() => Room, (room) => room.user)
  rooms: Room[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
