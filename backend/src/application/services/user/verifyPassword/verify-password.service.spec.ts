import { User } from '@domain/user/user.entity';
import { InMemoryUserRepository } from '@infra/database/in-memory/repositories/in-memory-user.repository';
import { CreateUserService } from '../createUser/create-user.service';
import { VerifyPasswordService } from './verify-password.service';
import { MockEncryptAdapter } from '@application/ports/mock.encrypt.adapter';

describe('Verify Password Service', () => {
  let user: User;

  const userRepository = new InMemoryUserRepository();
  const mockedEncryptAdapter = new MockEncryptAdapter();
  const verifyPasswordService = new VerifyPasswordService(
    userRepository,
    mockedEncryptAdapter,
  );
  const createUserService = new CreateUserService(
    userRepository,
    mockedEncryptAdapter,
  );

  beforeAll(async () => {
    user = await createUserService.execute({
      name: 'user-name',
      email: 'email@email.com',
      password: '123',
    });
  });

  test('success verify password', async () => {
    const successUser = await verifyPasswordService.execute({
      email: user.email,
      password: '123',
    });
    expect(successUser).toMatchObject(user);
  });

  test('invalid email', () => {
    expect(async () => {
      await verifyPasswordService.execute({
        email: 'invalid',
        password: 'invalid',
      });
    }).rejects.toThrow();
  });

  test('invalid password', () => {
    expect(async () => {
      await verifyPasswordService.execute({
        email: user.email,
        password: 'invalid',
      });
    }).rejects.toThrow();
  });
});
