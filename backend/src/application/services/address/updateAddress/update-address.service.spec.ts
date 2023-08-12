import { InMemoryAddressRepository } from '@infra/database/in-memory/repositories/in-memory-address.repository';
import { CreateAddressService } from '../createAddress/create-address.service';
import { UpdateAddressService } from './update-address.service';

describe('Update Address Service', () => {
  const addressRepository = new InMemoryAddressRepository();
  const updateAddressService = new UpdateAddressService(addressRepository);
  const createAddressService = new CreateAddressService(addressRepository);

  it('should be able to update an address', async () => {
    const address = await createAddressService.execute(
      {
        name: 'string',
        cep: '11222333',
        street: 'string',
        number: 'string',
        neighborhood: 'string',
        city: 'string',
        state: 'string',
      },
      'company-id',
    );

    await updateAddressService.execute(
      {
        name: 'changed-name',
        cep: '11222333',
        street: 'changed-street',
        number: 'changed-number',
        neighborhood: 'changed-neigh',
        city: 'changed-city',
        state: 'changed-state',
      },
      address.id,
    );

    expect(addressRepository.addresses[0].name).toBe('changed-name');
    expect(addressRepository.addresses[0].street).toBe('changed-street');
    expect(addressRepository.addresses[0].id).toBe(address.id);
  });
});
