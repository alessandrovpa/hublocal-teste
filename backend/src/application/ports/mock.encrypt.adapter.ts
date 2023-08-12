import { EncryptPort } from './encrypt.port';

export class MockEncryptAdapter implements EncryptPort {
  hashPassword(password: string): string {
    return password;
  }
  comparePassword(passwordToCompare: string, hashedPassword: string): boolean {
    return passwordToCompare === hashedPassword;
  }
}
