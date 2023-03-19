import { Address as LocalAddress } from '@modules/address/entities/address.entity';
import { Address as PrismaAddress } from '@prisma/client';

export class PrismaAddressMapper {
  static toPrisma(address: LocalAddress): PrismaAddress {
    return {
      id: address.id,
      name: address.name.toLocaleLowerCase(),
      cep: address.cep,
      street: address.street.toLocaleLowerCase(),
      number: address.number,
      neighborhood: address.neighborhood.toLocaleLowerCase(),
      city: address.city.toLocaleLowerCase(),
      state: address.state.toLocaleLowerCase(),
      company_id: address.companyId,
      created_at: address.createdAt,
      updated_at: address.updatedAt,
    };
  }

  static toLocal(address: PrismaAddress): LocalAddress {
    const localAddress = new LocalAddress({
      id: address.id,
      name: address.name,
      cep: address.cep,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      companyId: address.company_id,
      createdAt: address.created_at,
      updatedAt: address.updated_at,
    });

    return localAddress;
  }
}
