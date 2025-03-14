import { IsNumber, IsOptional, IsString } from 'class-validator';

export class getUserParamDto {
  @IsOptional()
  @IsNumber()
  total: string;
}
