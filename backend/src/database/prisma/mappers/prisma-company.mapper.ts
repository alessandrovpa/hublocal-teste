import { Company as LocalCompany } from '@modules/company/entities/company.entity';
import { Company as PrismaCompany } from '@prisma/client';

export class PrismaCompanyMapper {
  static toPrisma(company: LocalCompany): PrismaCompany {
    return {
      id: company.id,
      name: company.name.toLocaleLowerCase(),
      cnpj: company.cnpj,
      user_id: company.userId,
      website: company.website.toLocaleLowerCase(),
      created_at: company.createdAt,
      updated_at: company.updatedAt,
    };
  }

  static toLocal(company: PrismaCompany): LocalCompany {
    const localCompany = new LocalCompany({
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      userId: company.user_id,
      website: company.website,
      createdAt: company.created_at,
      updatedAt: company.updated_at,
    });

    return localCompany;
  }
}
