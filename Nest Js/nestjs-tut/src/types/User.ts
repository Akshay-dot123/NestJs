import { Column } from 'sequelize-typescript';
export class User {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;
}
