import { AppError } from '@application/errors/default-app-error';
import { UpdateAddresDto } from './update-address.dto';
import { AddressRepository } from '@domain/address/address.repository';
import { errorMessages } from '@common/utils/error-messages';

export class UpdateAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(data: UpdateAddresDto, addressId: string) {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      throw new AppError(errorMessages.unexistentAddressId, 404);
    }

    Object.assign(address, data);

    await this.addressRepository.update(address);

    return address;
  }
}
