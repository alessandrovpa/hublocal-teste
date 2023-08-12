import { AppError } from '@application/errors/default-app-error';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '@common/utils/error-messages';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    let responseBody = {
      statusCode: 500,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      timestamp: new Date(),
    };
    let httpStatus = 500;

    if (exception instanceof AppError) {
      responseBody = {
        statusCode: exception.statusCode,
        message: exception.message,
        timestamp: new Date(),
      };
      httpStatus = exception.statusCode;
    }

    this.httpAdapterHost.httpAdapter.reply(
      host.switchToHttp().getResponse(),
      responseBody,
      httpStatus,
    );
  }
}
