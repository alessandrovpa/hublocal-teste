import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { errorMessages } from '@utils/error-messages';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(user: CreateUserDto): Promise<User> {
    const verifyEmailAlreadyUser = await this.userRepository.findUserByEmail(
      user.email.replace(/\s+/g, '').trim(),
    );
    if (verifyEmailAlreadyUser) {
      throw new HttpException(
        errorMessages.emailAlreadyUsed,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = hashSync(user.password, 8);
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });

    await this.userRepository.create(newUser);

    return newUser;
  }
}
