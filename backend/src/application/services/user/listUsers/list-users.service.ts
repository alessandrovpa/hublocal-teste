import { UserRepository } from '@domain/user/user.repository';

export class ListUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.list();
    return users;
  }
}
