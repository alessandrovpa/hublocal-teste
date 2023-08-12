import { Company } from '@domain/company/company.entity';
import { CompanyRepository } from '@domain/company/company.repository';

export class ListCompaniesService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(userId: string): Promise<Company[]> {
    const companies = await this.companyRepository.list(userId);
    return companies;
  }
}
