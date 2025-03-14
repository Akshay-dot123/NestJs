/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString } from 'class-validator';

export class userDto {
  @IsOptional()
  @IsString({ message: 'Gender should be specified' })
  gender: string;

  @IsString()
  name: string;
  @IsString()
  email: string;
}
