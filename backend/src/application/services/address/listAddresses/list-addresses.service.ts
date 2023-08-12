import { AddressRepository } from '@domain/address/address.repository';

export class ListAddressesService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(companyId: string) {
    const addresses = await this.addressRepository.list(companyId);

    return addresses;
  }
}
