import { UserRepository } from '@modules/user/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.list();
    return users;
  }
}
