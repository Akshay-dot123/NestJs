import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  Admin = 'ADMIN',
  user = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The roles of a user in the system',
});

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.user })
  @Field(() => Role)
  role: Role;
}
