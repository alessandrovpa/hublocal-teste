import { AddressRepository } from '@domain/address/address.repository';
import { CompanyRepository } from '@domain/company/company.repository';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { errorMessages } from '@common/utils/error-messages';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AppError } from '@application/errors/default-app-error';

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
        throw new AppError(errorMessages.generic, 403);
      }
    } else if (request.params.address_id) {
      const address = await this.addressRepository.findById(
        request.params.address_id,
      );
      if (!address) {
        throw new AppError(errorMessages.unexistentAddressId, 400);
      }
      if (address.company.userId !== request.user.id) {
        throw new AppError(errorMessages.generic, 403);
      }
    }

    return next.handle().pipe();
  }
}
