import { InMemoryCompanyRepository } from '@infra/database/in-memory/repositories/in-memory-company.repository';
import { CreateCompanyService } from '../createCompany/create-company.service';
import { DeleteCompanyService } from './delete-company.service';

describe('Delete Company Service', () => {
  const companyRepository = new InMemoryCompanyRepository();
  const deleteCompanyService = new DeleteCompanyService(companyRepository);
  const createCompanyService = new CreateCompanyService(companyRepository);

  it('should be able to delete an company', async () => {
    const company = await createCompanyService.execute(
      {
        name: 'company-name',
        cnpj: '123',
        website: 'website.com',
      },
      'logged-user-id',
    );

    expect(companyRepository.companies).toHaveLength(1);

    await deleteCompanyService.execute(company.id);

    expect(companyRepository.companies).toHaveLength(0);
  });
});
