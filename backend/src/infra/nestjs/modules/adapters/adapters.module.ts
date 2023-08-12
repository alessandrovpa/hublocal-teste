import { Module } from '@nestjs/common';
import { BcryptAdapter } from '@infra/adapters/bcryptjs.adapter';
import { EncryptPort } from '@application/ports/encrypt.port';
import { JwtPort } from '@application/ports/jwt.port';
import { JwtAdapter } from '@infra/adapters/jest-jwt.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: EncryptPort,
      useFactory: () => {
        return new BcryptAdapter();
      },
    },
    {
      provide: JwtPort,
      useFactory: () => {
        return new JwtAdapter(process.env.JWT_SECRET);
      },
    },
  ],
  exports: [EncryptPort, JwtPort],
})
export class AdaptersModule {}
