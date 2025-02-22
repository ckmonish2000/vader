import * as O from 'fp-ts/Option';
import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { AuthUser } from 'src/types/AuthUser';

@Injectable()
export class CliTokenService {
  constructor(private readonly prisma: PrismaService) {}

  async createCliToken(user: AuthUser) {
    const token = await this.prisma.cliToken.create({
      data: {
        userId: user.uid,
      },
    });

    return token;
  }

  async validateCliToken(token: string) {
    if (!token) {
      return O.none;
    }
    const cliToken = await this.prisma.cliToken.findUnique({
      where: { token },
    });
 
    return cliToken ? O.some(cliToken) : O.none;
  }
}
