import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { CreateUserService } from './services/createUser/create-user.service';
import { UserController } from './user.controller';
import { VerifyPasswordService } from './services/verifyPassword/verify-password.service';
import { JwtAuthGuard } from '@modules/auth/strategies/jwt-auth.guard';
import { ListUsersService } from './services/listUsers/list-users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserService,
    VerifyPasswordService,
    ListUsersService,
    JwtAuthGuard,
  ],
  exports: [VerifyPasswordService],
})
export class UserModule {}
