import { Company } from '@modules/company/entities/company.entity';
import { CompanyRepository } from '@modules/company/repositories/company.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListCompaniesService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(userId: string): Promise<Company[]> {
    const companies = await this.companyRepository.list(userId);
    return companies;
  }
}
