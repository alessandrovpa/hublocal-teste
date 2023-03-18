import { Company } from './company.entity';

describe('Company Entity', () => {
  const companyProperties = {
    id: 'some-id',
    name: 'company-name',
    website: 'website.com',
    cnpj: '111111',
    userId: 'user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should be able to create a new company from entity with less properties', () => {
    const company = new Company({
      name: companyProperties.name,
      website: companyProperties.website,
      cnpj: companyProperties.cnpj,
      userId: companyProperties.userId,
    });

    expect(company).toHaveProperty('id');
    expect(company).toHaveProperty('createdAt');
    expect(company).toHaveProperty('updatedAt');
  });

  it('should be able to create a new company from entity with full properties', () => {
    const company = new Company(companyProperties);

    expect(company).toHaveProperty('id', companyProperties.id);
    expect(company).toHaveProperty('createdAt', companyProperties.createdAt);
    expect(company).toHaveProperty('updatedAt', companyProperties.updatedAt);
  });

  test('updatedAt must be auto updated when property change', async () => {
    const company = new Company(companyProperties);

    await new Promise((r) => setTimeout(r, 1));
    company.name = 'new-name';

    const isNewUpdatedDateGreaterThanOriginalUpdatedDate =
      company.updatedAt > companyProperties.updatedAt;

    expect(company.updatedAt).not.toStrictEqual(companyProperties.updatedAt);
    expect(isNewUpdatedDateGreaterThanOriginalUpdatedDate).toBe(true);
  });
});
