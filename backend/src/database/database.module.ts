import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '../modules/user/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';
import { CompanyRepository } from '@modules/company/repositories/company.repository';
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company.repository';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
    {
      provide: AddressRepository,
      useClass: PrismaAddressRepository,
    },
  ],
  exports: [UserRepository, CompanyRepository, AddressRepository],
})
export class DatabaseModule {}
