import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicOutputsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPublicOutputs(commandOutputIds: string[]) {
    const publicOutputs = await this.prisma.publicOutput.create({
      data: {
        commandOutputIds,
      },
    });

    return publicOutputs;
  }
}
