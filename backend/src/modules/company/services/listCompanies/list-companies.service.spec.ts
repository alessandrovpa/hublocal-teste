import { Company } from '../../entities/company.entity';
import { InMemoryCompanyRepository } from '@test/repositories/test-company.repository';
import { CreateCompanyService } from '../createCompany/create-company.service';
import { ListCompaniesService } from './list-companies.service';

describe('List Companies Service', () => {
  const companyRepository = new InMemoryCompanyRepository();
  const listCompaniesService = new ListCompaniesService(companyRepository);
  const createCompanyService = new CreateCompanyService(companyRepository);

  const name = 'company';
  const website = 'website.com';
  const userId = 'logged-user-id';

  it('should be able to list only the companies created by the logged user', async () => {
    let companies: Company[];
    await createCompanyService.execute(
      {
        name,
        cnpj: '123',
        website,
      },
      userId,
    );

    companies = await listCompaniesService.execute(userId);

    expect(companies).toHaveLength(1);

    await createCompanyService.execute(
      {
        name,
        cnpj: '456',
        website,
      },
      userId,
    );
    await createCompanyService.execute(
      {
        name,
        cnpj: '789',
        website,
      },
      'another-logged-user',
    );

    companies = await listCompaniesService.execute(userId);

    expect(companies).toHaveLength(2);
  });
});
