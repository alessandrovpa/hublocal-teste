import { User } from './user.entity';

describe('User Entity', () => {
  const userProperties = {
    id: 'some-id',
    name: 'user-name',
    email: 'user-email',
    password: 'user-password',
    createdAt: new Date(),
    updatedAt: new Date(),
    isAdmin: true,
  };

  it('should be able to create a new user from entity with less properties', () => {
    const user = new User({
      name: userProperties.name,
      email: userProperties.email,
      password: userProperties.password,
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('isAdmin');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });

  it('should be able to create a new user from entity with full properties', () => {
    const user = new User(userProperties);

    expect(user).toHaveProperty('id', userProperties.id);
    expect(user).toHaveProperty('isAdmin', userProperties.isAdmin);
    expect(user).toHaveProperty('createdAt', userProperties.createdAt);
    expect(user).toHaveProperty('updatedAt', userProperties.updatedAt);
  });

  it('should be able to toggle isAdmin property', () => {
    const user = new User({
      name: userProperties.name,
      email: userProperties.email,
      password: userProperties.password,
    });

    expect(user.isAdmin).toBe(false);
    user.toggleUserAdmin();
    expect(user.isAdmin).toBe(true);
    user.toggleUserAdmin();
    expect(user.isAdmin).toBe(false);
  });

  test('updatedAt must be auto updated when property change', async () => {
    const user = new User(userProperties);

    await new Promise((r) => setTimeout(r, 1));
    user.name = 'another-name';

    const isNewUpdatedDateGreaterThanOriginalUpdatedDate =
      user.updatedAt > userProperties.updatedAt;

    expect(user.updatedAt).not.toStrictEqual(userProperties.updatedAt);
    expect(isNewUpdatedDateGreaterThanOriginalUpdatedDate).toBe(true);
  });
});
