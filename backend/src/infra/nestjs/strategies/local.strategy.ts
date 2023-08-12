import { UserMapper } from '@common/mappers/user.mapper';
import { VerifyPasswordService } from '@application/services/user/verifyPassword/verify-password.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { errorMessages } from '@common/utils/error-messages';
import { Strategy } from 'passport-local';
import { AppError } from '@application/errors/default-app-error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private verifyPasswordService: VerifyPasswordService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.verifyPasswordService.execute({ email, password });
    if (!user) {
      throw new AppError(errorMessages.invalidEmailOrPassword, 401);
    }
    return UserMapper.toView(user);
  }
}
