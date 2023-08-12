export abstract class EncryptPort {
  abstract hashPassword(password: string): string;
  abstract comparePassword(
    passwordToCompare: string,
    hashedPassword: string,
  ): boolean;
}
