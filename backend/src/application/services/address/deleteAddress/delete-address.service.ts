import { AppError } from '@application/errors/default-app-error';
import { errorMessages } from '@common/utils/error-messages';
import { AddressRepository } from '@domain/address/address.repository';

export class DeleteAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(addressId: string) {
    const address = await this.addressRepository.findById(addressId);
    if (!address) {
      throw new AppError(errorMessages.unexistentAddressId, 404);
    }
    await this.addressRepository.delete(addressId);
  }
}
