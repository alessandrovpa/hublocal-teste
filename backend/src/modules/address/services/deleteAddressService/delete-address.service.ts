import { AddressRepository } from '@modules/address/repositories/address.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(addressId: string) {
    await this.addressRepository.delete(addressId);
  }
}
