import { Address } from './address.entity';

describe('Address Entity', () => {
  const addressProperties = {
    id: 'some-id',
    name: 'address-name',
    cep: '11222333',
    street: 'rua um',
    number: '123',
    neighborhood: 'neigh',
    city: 'some city',
    state: 'AA',
    companyId: 'some-company',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should be able to create a new address from entity with less properties', () => {
    const address = new Address({
      name: addressProperties.name,
      cep: addressProperties.cep,
      street: addressProperties.street,
      number: addressProperties.number,
      neighborhood: addressProperties.neighborhood,
      city: addressProperties.city,
      state: addressProperties.state,
      companyId: addressProperties.companyId,
    });

    expect(address).toHaveProperty('id');
    expect(address).toHaveProperty('createdAt');
    expect(address).toHaveProperty('updatedAt');
  });

  it('should be able to create a new company from entity with full properties', () => {
    const address = new Address(addressProperties);

    expect(address).toHaveProperty('id', addressProperties.id);
    expect(address).toHaveProperty('createdAt', addressProperties.createdAt);
    expect(address).toHaveProperty('updatedAt', addressProperties.updatedAt);
  });

  test('updatedAt must be auto updated when property change', async () => {
    const address = new Address(addressProperties);

    await new Promise((r) => setTimeout(r, 1));
    address.name = 'new-name';

    const isNewUpdatedDateGreaterThanOriginalUpdatedDate =
      address.updatedAt > addressProperties.updatedAt;

    expect(address.updatedAt).not.toStrictEqual(addressProperties.updatedAt);
    expect(isNewUpdatedDateGreaterThanOriginalUpdatedDate).toBe(true);
  });
});
