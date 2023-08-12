import { JwtPort } from '@application/ports/jwt.port';

export class AuthService {
  constructor(private jwt: JwtPort) {}

  async execute(userId: string): Promise<any> {
    const payload = { sub: userId };
    return this.jwt.createToken(payload);
  }
}
