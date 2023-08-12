import { User } from './user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract update(id: string, data: User): Promise<void>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract findUserById(id: string): Promise<User | null>;
  abstract list(): Promise<User[]>;
}
