import { Company } from '@domain/company/company.entity';
import { CompanyRepository } from '@domain/company/company.repository';

export class InMemoryCompanyRepository implements CompanyRepository {
  public companies: Company[];

  constructor() {
    this.companies = [];
  }

  async create(company: Company): Promise<void> {
    this.companies.push(company);
  }

  async findByCnpj(cnpj: string): Promise<Company> {
    const company = this.companies.find(
      (mapCompany) => mapCompany.cnpj === cnpj,
    );
    if (company) return company;
    return null;
  }

  async findById(id: string): Promise<Company> {
    const company = this.companies.find((mapCompany) => mapCompany.id === id);
    if (company) return company;
    return null;
  }

  async list(userId: string): Promise<Company[]> {
    const filteredCompanies = this.companies.filter(
      (mapCompany) => mapCompany.userId === userId,
    );
    return filteredCompanies;
  }

  async delete(id: string): Promise<void> {
    const companyIndex = this.companies.findIndex(
      (mapCompany) => mapCompany.id === id,
    );
    this.companies.splice(companyIndex, 1);
  }

  async update(updatedCompany: Company): Promise<void> {
    const companyIndex = this.companies.findIndex(
      (mapCompany) => mapCompany.id === updatedCompany.id,
    );
    this.companies[companyIndex] = updatedCompany;
  }
}
