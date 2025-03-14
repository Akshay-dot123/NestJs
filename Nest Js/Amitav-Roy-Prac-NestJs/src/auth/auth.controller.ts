import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';

// Note:- Code flow is from controller to strategy used and then to service file.
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  // @UseGuards(LocalStrategy)
  @Post('/login')
  login(@Request() req) {
    // return req.user;
    return this.authService.generateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  user(@Request() req) {
    return req.user;
  }
}
