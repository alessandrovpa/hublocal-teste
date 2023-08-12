import { DatabaseModule } from '../database/database.module';
import { JwtAuthGuard } from '@infra/nestjs/strategies/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import {
  CreateAddressService,
  DeleteAddressService,
  ListAddressesService,
  UpdateAddressService,
} from '@application/services/address';
import { AddressRepository } from '@domain/address/address.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [
    JwtAuthGuard,
    {
      provide: CreateAddressService,
      useFactory: (addressRepository: AddressRepository) => {
        return new CreateAddressService(addressRepository);
      },
      inject: [AddressRepository],
    },
    {
      provide: ListAddressesService,
      useFactory: (addressRepository: AddressRepository) => {
        return new ListAddressesService(addressRepository);
      },
      inject: [AddressRepository],
    },
    {
      provide: DeleteAddressService,
      useFactory: (addressRepository: AddressRepository) => {
        return new DeleteAddressService(addressRepository);
      },
      inject: [AddressRepository],
    },
    {
      provide: UpdateAddressService,
      useFactory: (addressRepository: AddressRepository) => {
        return new UpdateAddressService(addressRepository);
      },
      inject: [AddressRepository],
    },
  ],
})
export class AddressModule {}
