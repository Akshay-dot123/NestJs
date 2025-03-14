import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  async validateUser(name: string, email: string) {
    const userDB = await this.userService.findUser(name);
    if (userDB && userDB.email == email) {
      console.log(userDB);
      return userDB;
    }
    return null;
  }
}
