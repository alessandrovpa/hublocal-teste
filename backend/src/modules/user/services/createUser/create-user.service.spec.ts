import { InMemoryUserRepository } from '@test/repositories/test-user.repository';
import { CreateUserService } from './create-user.service';

describe('Create User Service', () => {
  const userRepository = new InMemoryUserRepository();
  const createUserService = new CreateUserService(userRepository);
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
