import { JwtPort } from './jwt.port';

export class MockJwtAdapter implements JwtPort {
  createToken(payload: any): string {
    return payload;
  }
  verifyToken(token: string): boolean {
    return !!token;
  }
}
