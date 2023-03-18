import { CreateUpdateCompanyDto } from '@modules/company/dtos/create-update-company.dto';
import { Company } from '@modules/company/entities/company.entity';
import { CompanyRepository } from '@modules/company/repositories/company.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { errorMessages } from '@utils/error-messages';

@Injectable()
export class CreateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(
    { name, cnpj, website }: CreateUpdateCompanyDto,
    userId: string,
  ): Promise<Company> {
    const clearedCnpj = cnpj.replace(/[^0-9]/g, '');
    if (!clearedCnpj) {
      throw new HttpException(
        errorMessages.cnpjRequired,
        HttpStatus.BAD_REQUEST,
      );
    }

    const verifyCnpjAlreadyExist = await this.companyRepository.findByCnpj(
      clearedCnpj,
    );
    if (verifyCnpjAlreadyExist) {
      throw new HttpException(
        errorMessages.cnpjAlreadyUsed,
        HttpStatus.BAD_REQUEST,
      );
    }

    const company = new Company({
      name,
      cnpj: clearedCnpj,
      website,
      userId,
    });

    await this.companyRepository.create(company);

    return company;
  }
}
