import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
    ) {}
    async validateUser(username: string, password: string) {
      const user = await this.userService.findOne(username);
      console.log('Runs 3rd after local.strategy');
      if (!user) {
        throw new BadRequestException('Incorrect email or password');
      }
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   throw new BadRequestException('Incorrect email or password');
      // }
      return user;
    }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
