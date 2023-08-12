import { JwtAuthGuard } from '@infra/nestjs/strategies/jwt-auth.guard';
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
import { IsLoggedUserOwnerOfCompany } from '../../interceptors/is-logged-user-owner-of-company.interceptor';
import { CreateAddresDto } from './create-address.dto';
import { UpdateAddresDto } from './update-address.dto';
import { Address } from '@domain/address/address.entity';
import { AddressMapper } from '@common/mappers/address.mapper';
import {
  CreateAddressService,
  DeleteAddressService,
  ListAddressesService,
  UpdateAddressService,
} from '@application/services/address';

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
    @Body() data: CreateAddresDto,
    @Param('company_id') companyId: string,
  ) {
    const address = await this.createAddressService.execute(data, companyId);
    return { address: AddressMapper.toView(address) };
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
      AddressMapper.toView(address),
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
    @Body() data: UpdateAddresDto,
  ) {
    const address = await this.updateAddressService.execute(data, addressId);

    return { address: AddressMapper.toView(address) };
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
