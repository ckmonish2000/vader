import { Module } from '@nestjs/common';
import { ScriptsController } from './scripts.controller';
import PrismaService from 'src/prisma.service';
import { ScriptsService } from './scripts.service';

@Module({
  controllers: [ScriptsController],
  providers: [ScriptsService, PrismaService],
})
export class ScriptsModule {}
