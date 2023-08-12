import { JwtAuthGuard } from '@infra/nestjs/strategies/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
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
import { Request as RequestInterface } from 'express';
import { IsLoggedUserOwnerOfCompany } from '@infra/nestjs/interceptors/is-logged-user-owner-of-company.interceptor';
import { CreateCompanyDto } from './create-company.dto';
import { UpdateCompanyDto } from './update-company.dto';
import { Company } from '@domain/company/company.entity';
import { CompanyMapper } from '@common/mappers/company.mapper';
import {
  CreateCompanyService,
  DeleteCompanyService,
  FindCompanyService,
  ListCompaniesService,
  UpdateCompanyService,
} from '@application/services/company';

@UseGuards(JwtAuthGuard)
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    private createCompanyService: CreateCompanyService,
    private listCompaniesService: ListCompaniesService,
    private delteCompanyService: DeleteCompanyService,
    private updateCompanyService: UpdateCompanyService,
    private findCompanyService: FindCompanyService,
  ) {}

  @ApiCreatedResponse({
    description: 'Empresa criada com sucesso!',
    type: Company,
  })
  @ApiBadRequestResponse({
    description: 'Campo com formato inválido ou não fornecido',
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @Post()
  async create(
    @Body() body: CreateCompanyDto,
    @Request() req: RequestInterface,
  ) {
    const company = await this.createCompanyService.execute(body, req.user.id);
    return { company: CompanyMapper.toView(company) };
  }

  @ApiOkResponse({
    description:
      'Lista de empresas cadastradas que o usuário logado é responsável!',
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @Get()
  async list(@Request() req: RequestInterface) {
    const companies = await this.listCompaniesService.execute(req.user.id);
    const companiesToReturn = companies.map((company) =>
      CompanyMapper.toView(company),
    );
    return { companies: companiesToReturn };
  }

  @ApiOkResponse({
    description: 'Todas as infomações da empresa fornecida',
    type: Company,
  })
  @ApiBadRequestResponse({
    description: 'Empresa não encontrada',
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @ApiForbiddenResponse({
    description: 'O usuário autenticado não é o responsável por esta empresa!',
  })
  @UseInterceptors(IsLoggedUserOwnerOfCompany)
  @Get('/:company_id')
  async findOne(@Param('company_id') companyId: string) {
    const company = await this.findCompanyService.execute(companyId);
    return { company: CompanyMapper.toView(company) };
  }

  @ApiOkResponse({
    description: 'Empresa editada com sucesso!',
    type: Company,
  })
  @ApiBadRequestResponse({
    description: 'Empresa não encontrada ou campos inválidos!',
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @ApiForbiddenResponse({
    description: 'O usuário autenticado não é o responsável por esta empresa!',
  })
  @UseInterceptors(IsLoggedUserOwnerOfCompany)
  @Put('/:company_id')
  async update(
    @Body() body: UpdateCompanyDto,
    @Param('company_id') id: string,
  ) {
    const company = await this.updateCompanyService.execute(body, id);
    return { company: CompanyMapper.toView(company) };
  }

  @ApiOkResponse({
    description: 'Empresa removida com sucesso!',
  })
  @ApiBadRequestResponse({
    description: 'Empresa não encontrada ou campos inválidos!',
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @ApiForbiddenResponse({
    description: 'O usuário autenticado não é o responsável por esta empresa!',
  })
  @UseInterceptors(IsLoggedUserOwnerOfCompany)
  @Delete('/:company_id')
  async delete(@Param('company_id') id: string) {
    await this.delteCompanyService.execute(id);
  }
}
