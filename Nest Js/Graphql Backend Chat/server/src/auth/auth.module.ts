import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [ AuthResolver, AuthService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'Nivalsa',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}

// import { Module } from '@nestjs/common';
// import { AuthResolver } from './auth.resolver';
// import { AuthService } from './auth.service';
// import { UserModule } from 'src/user/user.module';

// @Module({
//   providers: [AuthResolver],
//   imports: [UserModule],
// })
// export class AuthModule {}
