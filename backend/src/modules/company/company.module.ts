import { DatabaseModule } from '@database/database.module';
import { JwtAuthGuard } from '@modules/auth/strategies/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CreateCompanyService } from './services/createCompany/create-company.service';
import { DeleteCompanyService } from './services/deleteCompany/delete-company.service';
import { FindCompanyService } from './services/findCompany/find-company.service';
import { ListCompaniesService } from './services/listCompanies/list-companies.service';
import { UpdateCompanyService } from './services/updateCompany/update-company.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyController],
  providers: [
    CreateCompanyService,
    ListCompaniesService,
    DeleteCompanyService,
    UpdateCompanyService,
    FindCompanyService,
    JwtAuthGuard,
  ],
})
export class CompanyModule {}
