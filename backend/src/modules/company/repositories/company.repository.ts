import { Company } from '../entities/company.entity';

export abstract class CompanyRepository {
  abstract create(company: Company): Promise<void>;
  abstract findByCnpj(cnpj: string): Promise<Company | null>;
  abstract findById(id: string): Promise<Company | null>;
  abstract list(userId: string): Promise<Company[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(updatedCompany: Company): Promise<void>;
}
