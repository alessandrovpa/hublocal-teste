import { InMemoryAddressRepository } from '@test/repositories/teste-address.repository';
import { CreateAddressService } from '../createAddress/create-address.service';
import { DeleteAddressService } from './delete-address.service';

describe('Delete Address Service', () => {
  const addressRepository = new InMemoryAddressRepository();
  const deleteAddressService = new DeleteAddressService(addressRepository);
  const createAddressService = new CreateAddressService(addressRepository);

  it('should be able to delete an address', async () => {
    const address = await createAddressService.execute(
      {
        name: 'string',
        cep: '11222333asdfds',
        street: 'string',
        number: 'string',
        neighborhood: 'string',
        city: 'string',
        state: 'string',
      },
      'company-id',
    );

    expect(addressRepository.addresses).toHaveLength(1);

    await deleteAddressService.execute(address.id);

    expect(addressRepository.addresses).toHaveLength(0);
  });
});
