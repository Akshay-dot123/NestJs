// To verify jwt-Token and give access to routes like profile

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'Nivalsa',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    return { id: payload.id, email: payload.email };
  }
}
