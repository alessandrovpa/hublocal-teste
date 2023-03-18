import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { errorMessages } from '@utils/error-messages';

@Injectable()
export class VerifyTokenService {
  constructor(private jwtService: JwtService) {}

  async execute(token: string): Promise<void> {
    try {
      this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException(
        errorMessages.jwtExpired,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
