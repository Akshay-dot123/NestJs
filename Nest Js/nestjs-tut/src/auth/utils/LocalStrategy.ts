import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class YourLocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    // By default, the passport-local strategy expects username and password fields in the request body, but your validate() method is receiving name and email.
    // Fix: Tell Passport to explicitly expect name and email by passing them in the super() call:
    super({ usernameField: 'name', passwordField: 'email' });
  }
  async validate(name: string, email: string) {
    console.log("user==========>")
    const user= await this.authService.validateUser(name, email);
    if(!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}
