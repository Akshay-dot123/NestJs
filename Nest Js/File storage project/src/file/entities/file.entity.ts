import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class File {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  // This field will not be stored in db because @Column() does not exists
  @Field(() => String, { nullable: true })
  filePath?: string;

  @Column()
  @Field()
  fileId: string;

  @Column()
  @Field()
  filename: string;

  @Column()
  @Field()
  mimetype: string;

  @Field(() => Number)
  @Column('bigint')
  size: number;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  encoding: string;
}
