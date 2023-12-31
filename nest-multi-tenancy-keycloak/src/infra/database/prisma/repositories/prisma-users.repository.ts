import { User as RawUsers } from '@prisma/client';
import { User } from 'src/application/entities/user.entity';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { GetResult } from '@prisma/client/runtime';

export class PrismaUsersMapper {
  static toPrisma(data: User) {
    return {
      username: data.username,
      email: data.email,
      password: data.password,
      tenant_id: data.tenant_id,
    };
  }
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async findOneByEmail(email: string): Promise<RawUsers> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: User): Promise<RawUsers> {
    const prismaUserData = PrismaUsersMapper.toPrisma(data);

    const save = await this.prisma.user.create({
      data: prismaUserData,
    });

    return save;
  }
}
