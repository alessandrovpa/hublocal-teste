import { CreateUpdateAddresDto } from '@modules/address/dtos/create-update-address.dto';
import { Address } from '@modules/address/entities/address.entity';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { errorMessages } from '@utils/error-messages';

@Injectable()
export class CreateAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(data: CreateUpdateAddresDto, companyId: string) {
    const clearedCep = data.cep.replace(/[^0-9]/g, '');
    if (!clearedCep) {
      throw new HttpException(
        errorMessages.cepRequired,
        HttpStatus.BAD_REQUEST,
      );
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
