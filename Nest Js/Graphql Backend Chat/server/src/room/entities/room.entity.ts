import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Room {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  room_name: string;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.rooms, { onDelete: 'CASCADE' })
  user: User;
  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
