import { Module } from '@nestjs/common';
import { CommandsController } from './commands.controller';
import { CommandsService } from './commands.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CommandsController],
  providers: [CommandsService]
})
export class CommandsModule {}
