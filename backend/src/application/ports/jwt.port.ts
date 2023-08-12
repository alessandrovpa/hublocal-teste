export abstract class JwtPort {
  abstract createToken(payload: any): string;
  abstract verifyToken(token: string): boolean;
}
