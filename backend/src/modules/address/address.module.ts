import { DatabaseModule } from '@database/database.module';
import { JwtAuthGuard } from '@modules/auth/strategies/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { CreateAddressService } from './services/createAddress/create-address.service';
import { DeleteAddressService } from './services/deleteAddressService/delete-address.service';
import { ListAddressesService } from './services/listAddressesService/list-addresses.service';
import { UpdateAddressService } from './services/updateAddressService/update-address.service';

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
