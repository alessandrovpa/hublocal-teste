import { User } from '@modules/user/entities/user.entity';
import { InMemoryUserRepository } from '@test/repositories/test-user.repository';
import { CreateUserService } from '../createUser/create-user.service';
import { VerifyPasswordService } from './verify-password.service';

describe('Verify Password Service', () => {
  let user: User;

  const userRepository = new InMemoryUserRepository();
  const verifyPasswordService = new VerifyPasswordService(userRepository);
  const createUserService = new CreateUserService(userRepository);

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
