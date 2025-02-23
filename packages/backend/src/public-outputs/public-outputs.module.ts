import { Module } from '@nestjs/common';
import { PublicOutputsService } from './public-outputs.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PublicOutputsController } from './public-outputs.controller';

@Module({
  imports: [PrismaModule],
  providers: [PublicOutputsService],
  exports: [PublicOutputsService],
  controllers: [PublicOutputsController],
})
export class PublicOutputsModule {}
