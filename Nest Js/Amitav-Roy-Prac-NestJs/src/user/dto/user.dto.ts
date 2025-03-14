import { IsEmail, IsNotEmpty, Length } from 'class-validator';
export class UserDto {
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(3, 255)
  password: string;

  @IsNotEmpty()
  @Length(3, 255)
  confirm: string;
}
