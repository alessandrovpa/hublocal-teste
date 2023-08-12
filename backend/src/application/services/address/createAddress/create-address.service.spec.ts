import { InMemoryAddressRepository } from '@infra/database/in-memory/repositories/in-memory-address.repository';
import { CreateAddressService } from './create-address.service';

describe('Create Address Service', () => {
  const addressRepository = new InMemoryAddressRepository();
  const createAddressService = new CreateAddressService(addressRepository);

  it('should be able to create a new address', async () => {
    const address = await createAddressService.execute(
      {
        name: 'string',
        cep: '11222333abcdef',
        street: 'string',
        number: 'string',
        neighborhood: 'string',
        city: 'string',
        state: 'string',
      },
      'company-id',
    );

    expect(address).toHaveProperty('id');
    expect(address.cep).toBe('11222333');
    expect(addressRepository.addresses).toHaveLength(1);
  });

  it('should not be able to create a new company with an cep without numbers', async () => {
    expect(async () => {
      await createAddressService.execute(
        {
          name: 'string',
          cep: 'asdfdskfjdsk',
          street: 'string',
          number: 'string',
          neighborhood: 'string',
          city: 'string',
          state: 'string',
        },
        'company-id',
      );
    }).rejects.toThrow();
  });
});
