import { Module } from '@nestjs/common';
import { ScriptOutputsController } from './script-outputs.controller';
import { ScriptOutputsService } from './script-outputs.service';
import { ScriptsModule } from 'src/scripts/scripts.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PublicOutputsModule } from 'src/public-outputs/public-outputs.module';
@Module({
  imports: [ScriptsModule, PrismaModule, PublicOutputsModule],
  controllers: [ScriptOutputsController],
  providers: [ScriptOutputsService],
  exports: [ScriptOutputsService],
})
export class ScriptOutputsModule {}
