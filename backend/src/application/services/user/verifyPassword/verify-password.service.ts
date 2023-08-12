import { errorMessages } from '@common/utils/error-messages';
import { User } from '@domain/user/user.entity';
import { UserRepository } from '@domain/user/user.repository';
import { AppError } from '@application/errors/default-app-error';
import { EncryptPort } from '@application/ports/encrypt.port';

interface Request {
  email: string;
  password: string;
}

export class VerifyPasswordService {
  constructor(
    private userRepository: UserRepository,
    private encrypt: EncryptPort,
  ) {}

  async execute({ email, password }: Request): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError(errorMessages.invalidEmailOrPassword, 404);
    }

    const verifyPassword = this.encrypt.comparePassword(
      password,
      user.password,
    );
    if (!verifyPassword) {
      throw new AppError(errorMessages.invalidEmailOrPassword, 401);
    }

    return user;
  }
}
