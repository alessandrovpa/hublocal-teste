import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async execute(userId: string): Promise<any> {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
