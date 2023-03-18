import { CreateUpdateCompanyDto } from '@modules/company/dtos/create-update-company.dto';
import { CompanyRepository } from '@modules/company/repositories/company.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Company } from '../../entities/company.entity';
import { errorMessages } from '@utils/error-messages';

@Injectable()
export class UpdateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(
    { name, cnpj, website }: CreateUpdateCompanyDto,
    companyId: string,
  ): Promise<Company> {
    const company = await this.companyRepository.findById(companyId);

    const clearedCnpj = cnpj.replace(/[^1-9]/g, '');
    if (!clearedCnpj) {
      throw new HttpException(
        errorMessages.cnpjRequired,
        HttpStatus.BAD_REQUEST,
      );
    }

    const verifyCnpjAlreadyExist = await this.companyRepository.findByCnpj(
      clearedCnpj,
    );
    if (verifyCnpjAlreadyExist && verifyCnpjAlreadyExist.id != companyId) {
      throw new HttpException(
        errorMessages.cnpjAlreadyUsed,
        HttpStatus.BAD_REQUEST,
      );
    }

    company.name = name;
    company.cnpj = clearedCnpj;
    company.website = website;

    await this.companyRepository.update(company);

    return company;
  }
}
