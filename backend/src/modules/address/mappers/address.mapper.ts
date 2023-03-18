import { Address } from '../entities/address.entity';

export class AddressMapper {
  static toHTTP(address: Address) {
    return {
      id: address.id,
      name: address.name,
      cep: address.cep.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2-$3'),
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    };
  }
}
