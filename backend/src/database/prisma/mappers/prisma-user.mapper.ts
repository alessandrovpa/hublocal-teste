import { User as PrismaUser } from '@prisma/client';
import { User as LocalUser } from '@modules/user/entities/user.entity';

export class PrismaUserMapper {
  static toPrisma(user: LocalUser) {
    return {
      id: user.id,
      name: user.name.toLocaleLowerCase(),
      email: user.email.toLocaleLowerCase(),
      password: user.password,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }

  static toLocal(user: PrismaUser): LocalUser {
    const localUser = new LocalUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    });
    return localUser;
  }
}
