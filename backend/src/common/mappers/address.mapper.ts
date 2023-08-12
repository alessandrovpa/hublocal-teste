import { Address } from '@domain/address/address.entity';
import { stringCapitalize } from '../utils/string-capitalize';

export class AddressMapper {
  static toView(address: Address) {
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
