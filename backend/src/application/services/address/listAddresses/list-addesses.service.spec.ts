import { Address } from '@domain/address/address.entity';
import { InMemoryAddressRepository } from '@infra/database/in-memory/repositories/in-memory-address.repository';
import { CreateAddressService } from '../createAddress/create-address.service';
import { ListAddressesService } from './list-addresses.service';

describe('List Addresses Service', () => {
  const addressRepository = new InMemoryAddressRepository();
  const createAddressService = new CreateAddressService(addressRepository);
  const listAddressesService = new ListAddressesService(addressRepository);

  const companyId = 'company-id';

  it('should be able to list the addresses of an company', async () => {
    let addresses: Address[];

    await createAddressService.execute(
      {
        name: 'string',
        cep: '11222333',
        street: 'string',
        number: 'string',
        neighborhood: 'string',
        city: 'string',
        state: 'string',
      },
      companyId,
    );

    addresses = await listAddressesService.execute(companyId);

    expect(addresses).toHaveLength(1);

    await createAddressService.execute(
      {
        name: 'string',
        cep: '11222333',
        street: 'string',
        number: 'string',
        neighborhood: 'string',
        city: 'string',
        state: 'string',
      },
      companyId,
    );

    addresses = await listAddressesService.execute(companyId);

    expect(addresses).toHaveLength(2);
  });
});
