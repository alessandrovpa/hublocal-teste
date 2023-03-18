import { CompanyRepository } from '@modules/company/repositories/company.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string) {
    await this.companyRepository.delete(id);
  }
}
