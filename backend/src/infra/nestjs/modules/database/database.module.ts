import { Module } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UserRepository } from '@domain/user/user.repository';
import { CompanyRepository } from '@domain/company/company.repository';
import { AddressRepository } from '@domain/address/address.repository';
import {
  PrismaAddressRepository,
  PrismaCompanyRepository,
  PrismaUserRepository,
} from '@infra/database/prisma/repositories';
import {
  InMemoryAddressRepository,
  InMemoryCompanyRepository,
  InMemoryUserRepository,
} from '@infra/database/in-memory/repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: AddressRepository,
      useFactory: (prismaService: PrismaService) => {
        return new PrismaAddressRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: CompanyRepository,
      useFactory: (prismaService: PrismaService) => {
        return new PrismaCompanyRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: UserRepository,
      useFactory: (prismaService: PrismaService) => {
        return new PrismaUserRepository(prismaService);
      },
      inject: [PrismaService],
    },

    // * Para trocar o de PrismaORM para um ORM com banco de dados local(In Memory), comente as injeções acima e descomente as injeções abaixo* //

    // {
    //   provide: AddressRepository,
    //   useFactory: () => {
    //     return new InMemoryAddressRepository();
    //   },
    // },
    // {
    //   provide: CompanyRepository,
    //   useFactory: () => {
    //     return new InMemoryCompanyRepository();
    //   },
    // },
    // {
    //   provide: UserRepository,
    //   useFactory: () => {
    //     return new InMemoryUserRepository();
    //   },
    // },
  ],
  exports: [UserRepository, CompanyRepository, AddressRepository],
})
export class DatabaseModule {}
