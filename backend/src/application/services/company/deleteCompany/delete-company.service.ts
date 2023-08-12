import { AppError } from '@application/errors/default-app-error';
import { errorMessages } from '@common/utils/error-messages';
import { CompanyRepository } from '@domain/company/company.repository';

export class DeleteCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string) {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new AppError(errorMessages.unexistentCompanyId, 404);
    }

    await this.companyRepository.delete(id);
  }
}
