import { InMemoryCompanyRepository } from '@test/repositories/test-company.repository';
import { CreateCompanyService } from './create-company.service';

describe('Create Company Service', () => {
  const companyRepository = new InMemoryCompanyRepository();
  const createCompanyService = new CreateCompanyService(companyRepository);

  const name = 'company-name';
  const website = 'website.com';
  const cnpj = '11222333000100';

  it('should be able to create a new company', async () => {
    const company = await createCompanyService.execute(
      {
        name,
        website,
        cnpj: `${cnpj}fdnedfn@#$(*$(#%*    ))`,
      },
      'logged-user-id',
    );

    expect(company).toHaveProperty('id');
    expect(company.cnpj).toBe(cnpj);
    expect(companyRepository.companies).toHaveLength(1);
  });

  it('should not be able to create a new company with an already registered cnpj', async () => {
    expect(async () => {
      await createCompanyService.execute(
        {
          name,
          website,
          cnpj,
        },
        'logged-user-id',
      );
    }).rejects.toThrow();
  });

  it('should not be able to create a new company with an cnpj without numbers', async () => {
    expect(async () => {
      await createCompanyService.execute(
        {
          name,
          website,
          cnpj: 'abc',
        },
        'logged-user-id',
      );
    }).rejects.toThrow();
  });
});
