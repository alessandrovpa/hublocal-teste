import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from '@application/services/auth/makeAuth/auth.service';
import { LocalStrategy } from '@infra/nestjs/strategies/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '@infra/nestjs/strategies/jwt.strategy';
import { VerifyTokenService } from '@application/services/auth/verifyToken/verify-token.service';
import { JwtPort } from '@application/ports/jwt.port';
import { AdaptersModule } from '../adapters/adapters.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, PassportModule, AdaptersModule],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: AuthService,
      useFactory: (jwtAdapter: JwtPort) => {
        return new AuthService(jwtAdapter);
      },
      inject: [JwtPort],
    },
    {
      provide: VerifyTokenService,
      useFactory: (jwtAdapter: JwtPort) => {
        return new VerifyTokenService(jwtAdapter);
      },
      inject: [JwtPort],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
