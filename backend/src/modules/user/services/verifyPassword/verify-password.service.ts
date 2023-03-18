import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { errorMessages } from '@utils/error-messages';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

interface Request {
  email: string;
  password: string;
}

@Injectable()
export class VerifyPasswordService {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: Request): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new HttpException(
        errorMessages.invalidEmailOrPassword,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const verifyPassword = compareSync(password, user.password);
    if (!verifyPassword) {
      throw new HttpException(
        errorMessages.invalidEmailOrPassword,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
