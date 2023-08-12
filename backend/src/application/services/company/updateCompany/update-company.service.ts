import { UpdateCompanyDto } from './update-company.dto';
import { CompanyRepository } from '@domain/company/company.repository';
import { Company } from '@domain/company/company.entity';
import { errorMessages } from '@common/utils/error-messages';
import { AppError } from '@application/errors/default-app-error';

export class UpdateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(
    { name, cnpj, website }: UpdateCompanyDto,
    companyId: string,
  ): Promise<Company> {
    const company = await this.companyRepository.findById(companyId);

    const clearedCnpj = cnpj.replace(/[^1-9]/g, '');
    if (!clearedCnpj) {
      throw new AppError(errorMessages.cnpjRequired, 400);
    }

    const verifyCnpjAlreadyExist = await this.companyRepository.findByCnpj(
      clearedCnpj,
    );
    if (verifyCnpjAlreadyExist && verifyCnpjAlreadyExist.id != companyId) {
      throw new AppError(errorMessages.cnpjAlreadyUsed, 400);
    }

    company.name = name;
    company.cnpj = clearedCnpj;
    company.website = website;

    await this.companyRepository.update(company);

    return company;
  }
}
