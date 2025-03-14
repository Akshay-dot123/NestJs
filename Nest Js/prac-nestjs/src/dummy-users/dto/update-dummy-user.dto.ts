import { PartialType } from '@nestjs/mapped-types';
import { userDto } from './dummy-users.dto';

// Note:- This will make all userDto fields optional for updating
export class updateUserDto extends PartialType(userDto) {}
