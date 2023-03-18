import { AddressRepository } from '@modules/address/repositories/address.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAddressesService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(companyId: string) {
    const addresses = await this.addressRepository.list(companyId);

    return addresses;
  }
}
