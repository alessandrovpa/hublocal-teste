import { JwtAuthGuard } from '@modules/auth/strategies/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsLoggedUserOwnerOfCompany } from 'src/interceptors/is-logged-user-owner-of-company.interceptor';
import { CreateUpdateAddresDto } from './dtos/create-update-address.dto';
import { Address } from './entities/address.entity';
import { AddressMapper } from './mappers/address.mapper';
import { CreateAddressService } from './services/createAddress/create-address.service';
import { DeleteAddressService } from './services/deleteAddress/delete-address.service';
import { ListAddressesService } from './services/listAddresses/list-addresses.service';
import { UpdateAddressService } from './services/updateAddress/update-address.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(IsLoggedUserOwnerOfCompany)
@ApiTags('address')
@Controller()
export class AddressController {
  constructor(
    private createAddressService: CreateAddressService,
    private listAddressesService: ListAddressesService,
    private deleteAddressService: DeleteAddressService,
    private updateAddressService: UpdateAddressService,
  ) {}

  @ApiCreatedResponse({
    description: 'Endereço criada com sucesso!',
    type: Address,
  })
  @ApiBadRequestResponse({
    description: 'Campo com formato inválido ou não fornecido',
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @ApiForbiddenResponse({
    description: 'O usuário autenticado não é o responsável por esta empresa!',
  })
  @Post('/company/:company_id/address')
  async create(
    @Body() data: CreateUpdateAddresDto,
    @Param('company_id') companyId: string,
  ) {
    const address = await this.createAddressService.execute(data, companyId);
    return { address: AddressMapper.toHTTP(address) };
  }

  @ApiOkResponse({
    description: 'Lista de endereços da empresa enviada!',
    type: Address,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Empresa não encontrada!',
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @ApiForbiddenResponse({
    description: 'O usuário autenticado não é o responsável por esta empresa!',
  })
  @Get('/company/:company_id/address')
  async list(@Param('company_id') companyId: string) {
    const addresses = await this.listAddressesService.execute(companyId);

    const addressesToReturn = addresses.map((address) =>
      AddressMapper.toHTTP(address),
    );

    return { addresses: addressesToReturn };
  }

  @ApiOkResponse({
    description: 'Endereço atualizado com sucesso!',
    type: Address,
  })
  @ApiBadRequestResponse({
    description: 'Endereço não encontrado!',
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @ApiForbiddenResponse({
    description: 'O usuário autenticado não é o responsável por esta empresa!',
  })
  @Put('/address/:address_id')
  async update(
    @Param('address_id') addressId: string,
    @Body() data: CreateUpdateAddresDto,
  ) {
    const address = await this.updateAddressService.execute(data, addressId);

    return { address: AddressMapper.toHTTP(address) };
  }

  @ApiOkResponse({
    description: 'Endereço removido com sucesso!',
  })
  @ApiBadRequestResponse({
    description: 'Endereço não encontrado!',
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @ApiForbiddenResponse({
    description: 'O usuário autenticado não é o responsável por esta empresa!',
  })
  @Delete('/address/:address_id')
  async delete(@Param('address_id') addressId: string) {
    await this.deleteAddressService.execute(addressId);
  }
}
