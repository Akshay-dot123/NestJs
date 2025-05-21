import { Field, ObjectType } from '@nestjs/graphql';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType() 
export class Message {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  message: string;

  @Column({ default: false })
  @Field()
  isDeleted: boolean;

  @Field(() => Room)
  @ManyToOne(() => Room, (room) => room.messages, { onDelete: 'CASCADE' })
  room: Room;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
