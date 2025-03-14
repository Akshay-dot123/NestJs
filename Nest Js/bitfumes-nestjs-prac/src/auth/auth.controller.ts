import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
// Note:- Code flow is from controller to strategy used and then to service file.

// Method-1 using body and authService
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginDto: any) {
    // return this.authService.validateUser(loginDto.email, loginDto.password);
    // Below line is to get JwtToken
    return this.authService.login(loginDto);
  }
}

// Method-2
// export class AuthController {
//   @UseGuards(AuthGuard('local'))
//   @Post('/login')
//   login(@Request() req: any) {
//     return req.user;
//   }
// }
