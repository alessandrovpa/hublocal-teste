import { AppError } from '@application/errors/default-app-error';
import { errorMessages } from '@common/utils/error-messages';
import { CompanyRepository } from '@domain/company/company.repository';

export class FindCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(companyId: string) {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError(errorMessages.unexistentCompanyId, 404);
    }

    return company;
  }
}
