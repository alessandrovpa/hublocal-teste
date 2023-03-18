import { AddressMapper } from '@modules/address/mappers/address.mapper';
import { Company } from '../entities/company.entity';

export class CompanyMapper {
  static toHTTP(company: Company) {
    const httpCompany = {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
      ),
      addressesCount: company.addressesCount,
      website: company.website,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };

    if (company.addresses) {
      const localAddresses = company.addresses.map((address) =>
        AddressMapper.toHTTP(address),
      );
      Object.assign(httpCompany, {
        addresses: localAddresses,
      });
    }

    return httpCompany;
  }
}
