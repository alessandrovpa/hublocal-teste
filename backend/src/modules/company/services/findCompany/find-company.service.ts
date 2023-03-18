import { CompanyRepository } from '@modules/company/repositories/company.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(companyId: string) {
    const company = await this.companyRepository.findById(companyId);

    return company;
  }
}
