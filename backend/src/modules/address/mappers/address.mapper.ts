import { stringCapitalize } from '@utils/string-capitalize';
import { Address } from '../entities/address.entity';

export class AddressMapper {
  static toHTTP(address: Address) {
    return {
      id: address.id,
      name: stringCapitalize(address.name),
      cep: address.cep.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2-$3'),
      street: stringCapitalize(address.street),
      number: address.number,
      neighborhood: stringCapitalize(address.neighborhood),
      city: stringCapitalize(address.city),
      state: address.state.toUpperCase(),
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    };
  }
}
