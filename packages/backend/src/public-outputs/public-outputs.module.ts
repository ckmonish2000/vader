import { Module } from '@nestjs/common';
import { PublicOutputsService } from './public-outputs.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PublicOutputsService],
  exports: [PublicOutputsService],
})
export class PublicOutputsModule {}
