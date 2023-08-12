import { DatabaseModule } from '../database/database.module';
import { JwtAuthGuard } from '@infra/nestjs/strategies/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CreateCompanyService } from '@application/services/company/createCompany/create-company.service';
import { DeleteCompanyService } from '@application/services/company/deleteCompany/delete-company.service';
import { FindCompanyService } from '@application/services/company/findCompany/find-company.service';
import { ListCompaniesService } from '@application/services/company/listCompanies/list-companies.service';
import { UpdateCompanyService } from '@application/services/company/updateCompany/update-company.service';
import { CompanyRepository } from '@domain/company/company.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyController],
  providers: [
    JwtAuthGuard,
    {
      provide: CreateCompanyService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new CreateCompanyService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: ListCompaniesService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new ListCompaniesService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: DeleteCompanyService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new DeleteCompanyService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: UpdateCompanyService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new UpdateCompanyService(companyRepository);
      },
      inject: [CompanyRepository],
    },
    {
      provide: FindCompanyService,
      useFactory: (companyRepository: CompanyRepository) => {
        return new FindCompanyService(companyRepository);
      },
      inject: [CompanyRepository],
    },
  ],
})
export class CompanyModule {}
