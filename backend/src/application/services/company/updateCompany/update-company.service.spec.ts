import { InMemoryCompanyRepository } from '@infra/database/in-memory/repositories/in-memory-company.repository';
import { CreateCompanyService } from '../createCompany/create-company.service';
import { UpdateCompanyService } from './update-company.service';

describe('Update Company Service', () => {
  const companyRepository = new InMemoryCompanyRepository();
  const updateCompanyService = new UpdateCompanyService(companyRepository);
  const createCompanyService = new CreateCompanyService(companyRepository);

  const name = 'company';
  const website = 'website.com';
  const userId = 'logged-user-id';

  it('should be able to update an company', async () => {
    const company = await createCompanyService.execute(
      {
        name,
        cnpj: '123',
        website,
      },
      userId,
    );

    await updateCompanyService.execute(
      {
        name: 'changed-name',
        cnpj: '123',
        website: 'changed.com',
      },
      company.id,
    );

    expect(companyRepository.companies[0].name).toBe('changed-name');
    expect(companyRepository.companies[0].website).toBe('changed.com');
    expect(companyRepository.companies[0].id).toBe(company.id);
  });

  it('should not be able to update cnpj to an already used cnpj', async () => {
    const company = await createCompanyService.execute(
      {
        name,
        cnpj: '321',
        website,
      },
      userId,
    );

    expect(async () => {
      await updateCompanyService.execute(
        {
          name,
          cnpj: '123', //already registered on previously test
          website,
        },
        company.id,
      );
    }).rejects.toThrow();
  });
});
