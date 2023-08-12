import { JwtPort } from '@application/ports/jwt.port';
import { JwtService } from '@nestjs/jwt';

export class JwtAdapter implements JwtPort {
  private nestJwtService: JwtService;

  constructor(secret: string) {
    this.nestJwtService = new JwtService({
      secret: secret,
      signOptions: {
        expiresIn: '1d',
      },
    });
  }

  createToken(payload: any): string {
    const token = this.nestJwtService.sign(payload);
    return token;
  }
  verifyToken(token: string): boolean {
    try {
      this.nestJwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
