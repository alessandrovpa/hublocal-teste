import { CreateCompanyDto } from './create-company.dto';
import { Company } from '@domain/company/company.entity';
import { CompanyRepository } from '@domain/company/company.repository';
import { errorMessages } from '@common/utils/error-messages';
import { AppError } from '@application/errors/default-app-error';

export class CreateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(
    { name, cnpj, website }: CreateCompanyDto,
    userId: string,
  ): Promise<Company> {
    const clearedCnpj = cnpj.replace(/[^0-9]/g, '');
    if (!clearedCnpj) {
      throw new AppError(errorMessages.cnpjRequired, 400);
    }

    const verifyCnpjAlreadyExist = await this.companyRepository.findByCnpj(
      clearedCnpj,
    );
    if (verifyCnpjAlreadyExist) {
      throw new AppError(errorMessages.cnpjAlreadyUsed, 400);
    }

    const company = new Company({
      name,
      cnpj: clearedCnpj,
      website,
      userId,
    });

    await this.companyRepository.create(company);

    return company;
  }
}
