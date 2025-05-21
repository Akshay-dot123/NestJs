import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req?.cookies?.['token']?.access_token; // if cookie is an object
          console.log("token========>",req.cookies)
          if(!token){
            throw new UnauthorizedException('Invalid or expired token');
          }
          return token || null;
        },
        // Fallback: from Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: 'Nivalsa',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    return { id: payload.id, username: payload.username};
  }
}
