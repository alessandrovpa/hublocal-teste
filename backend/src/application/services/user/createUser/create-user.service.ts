import { errorMessages } from '@common/utils/error-messages';
import { CreateUserDto } from './create-user.dto';
import { User } from '@domain/user/user.entity';
import { UserRepository } from '@domain/user/user.repository';
import { AppError } from '@application/errors/default-app-error';
import { EncryptPort } from '@application/ports/encrypt.port';

export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private encrypt: EncryptPort,
  ) {}

  async execute(user: CreateUserDto): Promise<User> {
    const verifyEmailAlreadyUser = await this.userRepository.findUserByEmail(
      user.email,
    );
    if (verifyEmailAlreadyUser) {
      throw new AppError(errorMessages.emailAlreadyUsed, 400);
    }

    const hashedPassword = this.encrypt.hashPassword(user.password);
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });

    await this.userRepository.create(newUser);

    return newUser;
  }
}
