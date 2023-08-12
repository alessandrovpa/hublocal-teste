import { User } from '@domain/user/user.entity';
import { UserRepository } from '@domain/user/user.repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[];

  constructor() {
    this.users = [];
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async update(id: string, data: User): Promise<void> {
    const userIndex = this.users.findIndex((mapUser) => mapUser.id === id);
    if (userIndex) {
      this.users[userIndex] = data;
    }
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (user) return user;
    return null;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (user) return user;
    return null;
  }
}
