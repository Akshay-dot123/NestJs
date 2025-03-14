import { Column, Model, Table } from 'sequelize-typescript';
import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';

@Table
export class User extends Model {
  @Column
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  name: string;

  @Column
  @IsEmail()
  email: string;
}
