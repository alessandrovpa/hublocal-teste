import { AddressRepository } from '@modules/address/repositories/address.repository';
import { CompanyRepository } from '@modules/company/repositories/company.repository';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { errorMessages } from '@utils/error-messages';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class IsLoggedUserOwnerOfCompany implements NestInterceptor {
  constructor(
    private companyRepository: CompanyRepository,
    private addressRepository: AddressRepository,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.params.company_id) {
      const company = await this.companyRepository.findById(
        request.params.company_id,
      );
      if (!company) {
        throw new HttpException(
          errorMessages.unexistentCompanyId,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (company.userId !== request.user.id) {
        throw new HttpException(errorMessages.generic, HttpStatus.FORBIDDEN);
      }
    } else if (request.params.address_id) {
      const address = await this.addressRepository.findById(
        request.params.address_id,
      );
      if (!address) {
        throw new HttpException(
          errorMessages.unexistentAddressId,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (address.company.userId !== request.user.id) {
        throw new HttpException(errorMessages.generic, HttpStatus.FORBIDDEN);
      }
    }

    return next.handle().pipe();
  }
}
