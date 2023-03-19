import { DatabaseModule } from '@database/database.module';
import { JwtAuthGuard } from '@modules/auth/strategies/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { CreateAddressService } from './services/createAddress/create-address.service';
import { DeleteAddressService } from './services/deleteAddress/delete-address.service';
import { ListAddressesService } from './services/listAddresses/list-addresses.service';
import { UpdateAddressService } from './services/updateAddress/update-address.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [
    CreateAddressService,
    ListAddressesService,
    DeleteAddressService,
    UpdateAddressService,
    JwtAuthGuard,
  ],
})
export class AddressModule {}
