import { User } from '@modules/user/entities/user.entity';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const prismaUser = PrismaUserMapper.toPrisma(user);
    await this.prismaService.user.create({ data: prismaUser });
  }

  async update(id: string, data: User): Promise<void> {
    const prismaUser = PrismaUserMapper.toPrisma(data);
    await this.prismaService.user.update({ where: { id }, data: prismaUser });
  }

  async list(): Promise<User[]> {
    const prismaUsers = await this.prismaService.user.findMany({
      orderBy: { created_at: 'asc' },
    });
    const users = prismaUsers.map((user) => PrismaUserMapper.toLocal(user));
    return users;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (user) return PrismaUserMapper.toLocal(user);

    return null;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (user) return PrismaUserMapper.toLocal(user);

    return null;
  }
}
