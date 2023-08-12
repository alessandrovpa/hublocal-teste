import { InMemoryUserRepository } from '@infra/database/in-memory/repositories/in-memory-user.repository';
import { CreateUserService } from './create-user.service';
import { MockEncryptAdapter } from '@application/ports/mock.encrypt.adapter';

describe('Create User Service', () => {
  const userRepository = new InMemoryUserRepository();
  const mockedEncryptAdapter = new MockEncryptAdapter();
  const createUserService = new CreateUserService(
    userRepository,
    mockedEncryptAdapter,
  );
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'user-name',
      email: 'user-email',
      password: 'user-password',
    });

    expect(user).toHaveProperty('id');
    expect(userRepository.users).toHaveLength(1);
  });

  it('should not be able to create an user with an already registered email', () => {
    expect(async () => {
      await createUserService.execute({
        name: 'user-name',
        email: 'user-email',
        password: 'user-password',
      });
    }).rejects.toThrow();
  });
});
