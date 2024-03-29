import { Company } from '@domain/company/company.entity';
import { CompanyRepository } from '@domain/company/company.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAddressMapper, PrismaCompanyMapper } from '../mappers';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prismaService: PrismaService) {}

  async create(company: Company): Promise<void> {
    const prismaCompany = PrismaCompanyMapper.toPrisma(company);
    await this.prismaService.company.create({ data: prismaCompany });
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const company = await this.prismaService.company.findFirst({
      where: {
        cnpj,
      },
    });

    if (company) return PrismaCompanyMapper.toLocal(company);

    return null;
  }

  async findById(id: string): Promise<Company | null> {
    const company = await this.prismaService.company.findUnique({
      where: {
        id,
      },
      include: { addresses: true },
    });

    if (!company) return null;

    const localCompany = PrismaCompanyMapper.toLocal(company);
    localCompany.addressesCount = company.addresses.length;

    const localAddresses = company.addresses.map((address) =>
      PrismaAddressMapper.toLocal(address),
    );
    localCompany.addresses = localAddresses;

    return localCompany;
  }

  async list(userId: string): Promise<Company[]> {
    const companies = await this.prismaService.company.findMany({
      where: {
        user_id: userId,
      },
      include: { addresses: true },
      orderBy: {
        created_at: 'asc',
      },
    });

    const localCompanies = companies.map((company) => {
      const localCompany = PrismaCompanyMapper.toLocal(company);

      localCompany.addressesCount = company.addresses.length;

      return localCompany;
    });

    return localCompanies;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.company.delete({ where: { id } });
  }

  async update(updatedCompany: Company): Promise<void> {
    const prismaCompany = PrismaCompanyMapper.toPrisma(updatedCompany);
    await this.prismaService.company.update({
      data: prismaCompany,
      where: {
        id: updatedCompany.id,
      },
    });
  }
}
