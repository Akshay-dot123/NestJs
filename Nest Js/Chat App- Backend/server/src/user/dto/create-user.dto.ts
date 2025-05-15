import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  username: string;
  @IsString()
  @MinLength(4)
  password: string;
  @IsString()
  room: string;
}
