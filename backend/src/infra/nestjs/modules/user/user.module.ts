import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { JwtAuthGuard } from '@infra/nestjs/strategies/jwt-auth.guard';
import { UserRepository } from '@domain/user/user.repository';
import {
  CreateUserService,
  ListUsersService,
  VerifyPasswordService,
} from '@application/services/user';
import { EncryptPort } from '@application/ports/encrypt.port';
import { AdaptersModule } from '../adapters/adapters.module';

@Module({
  imports: [DatabaseModule, AdaptersModule],
  controllers: [UserController],
  providers: [
    JwtAuthGuard,
    {
      provide: CreateUserService,
      useFactory: (
        userRepository: UserRepository,
        encryptAdapter: EncryptPort,
      ) => {
        return new CreateUserService(userRepository, encryptAdapter);
      },
      inject: [UserRepository, EncryptPort],
    },
    {
      provide: VerifyPasswordService,
      useFactory: (
        userRepository: UserRepository,
        encryptAdapter: EncryptPort,
      ) => {
        return new VerifyPasswordService(userRepository, encryptAdapter);
      },
      inject: [UserRepository, EncryptPort],
    },
    {
      provide: ListUsersService,
      useFactory: (userRepository: UserRepository) => {
        return new ListUsersService(userRepository);
      },
      inject: [UserRepository],
    },
  ],
  exports: [VerifyPasswordService],
})
export class UserModule {}
