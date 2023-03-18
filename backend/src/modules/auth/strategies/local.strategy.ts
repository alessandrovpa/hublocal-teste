import { UserMapper } from '@modules/user/mappers/user.mapper';
import { VerifyPasswordService } from '@modules/user/services/verifyPassword/verify-password.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { errorMessages } from '@utils/error-messages';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private verifyPasswordService: VerifyPasswordService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.verifyPasswordService.execute({ email, password });
    if (!user) {
      throw new HttpException(
        errorMessages.invalidEmailOrPassword,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return UserMapper.toHTTP(user);
  }
}
