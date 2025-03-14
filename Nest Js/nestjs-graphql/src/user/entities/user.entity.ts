import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Table will not be created if you did not add this.
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Field()
  email: string;
  @Column()
  @Field()
  password: string;
}
