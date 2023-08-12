import { errorMessages } from '@common/utils/error-messages';
import { AppError } from '@application/errors/default-app-error';
import { JwtPort } from '@application/ports/jwt.port';

export class VerifyTokenService {
  constructor(private jwt: JwtPort) {}

  async execute(token: string): Promise<void> {
    const validToken = this.jwt.verifyToken(token);
    if (!validToken) {
      throw new AppError(errorMessages.jwtExpired, 401);
    }
  }
}
