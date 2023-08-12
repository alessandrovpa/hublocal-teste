import { EncryptPort } from '@application/ports/encrypt.port';
import { hashSync, compareSync } from 'bcrypt';

export class BcryptAdapter implements EncryptPort {
  hashPassword(password: string): string {
    return hashSync(password, 8);
  }
  comparePassword(passwordToCompare: string, hashedPassword: string): boolean {
    return compareSync(passwordToCompare, hashedPassword);
  }
}
