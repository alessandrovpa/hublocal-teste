import { Address } from '@modules/address/entities/address.entity';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { Injectable } from '@nestjs/common';
import { PrismaAddressMapper } from '../mappers/prisma-address.mapper';
import { PrismaCompanyMapper } from '../mappers/prisma-company.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prismaService: PrismaService) {}

  async create(address: Address): Promise<void> {
    const prismaAddress = PrismaAddressMapper.toPrisma(address);
    await this.prismaService.address.create({ data: prismaAddress });
  }

  async findById(id: string): Promise<Address> {
    const address = await this.prismaService.address.findUnique({
      where: {
        id,
      },
      include: { Company: true },
    });

    if (!address) return null;

    const localAddress = PrismaAddressMapper.toLocal(address);

    const localCompany = PrismaCompanyMapper.toLocal(address.Company);
    localAddress.company = localCompany;

    return localAddress;
  }

  async list(companyId: string): Promise<Address[]> {
    const addresses = await this.prismaService.address.findMany({
      where: {
        company_id: companyId,
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    const localAddresses = addresses.map((address) =>
      PrismaAddressMapper.toLocal(address),
    );

    return localAddresses;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.address.delete({ where: { id } });
  }

  async update(updatedAddress: Address): Promise<void> {
    const prismaAddress = PrismaAddressMapper.toPrisma(updatedAddress);
    await this.prismaService.address.update({
      data: prismaAddress,
      where: {
        id: updatedAddress.id,
      },
    });
  }
}
