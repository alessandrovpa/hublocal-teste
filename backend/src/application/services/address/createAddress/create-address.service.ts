import { CreateAddresDto } from './create-address.dto';
import { Address } from '@domain/address/address.entity';
import { AddressRepository } from '@domain/address/address.repository';
import { errorMessages } from '@common/utils/error-messages';
import { AppError } from '@application/errors/default-app-error';

export class CreateAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(data: CreateAddresDto, companyId: string) {
    const clearedCep = data.cep.replace(/[^0-9]/g, '');
    if (!clearedCep) {
      throw new AppError(errorMessages.cepRequired, 400);
    }

    const address = new Address({
      ...data,
      companyId,
      cep: clearedCep,
    });

    await this.addressRepository.create(address);

    return address;
  }
}
