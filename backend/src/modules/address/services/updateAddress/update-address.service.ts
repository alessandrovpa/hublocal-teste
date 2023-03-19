import { CreateUpdateAddresDto } from '@modules/address/dtos/create-update-address.dto';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(data: CreateUpdateAddresDto, addressId: string) {
    const address = await this.addressRepository.findById(addressId);

    Object.assign(address, data);

    await this.addressRepository.update(address);

    return address;
  }
}
