import { Module } from '@nestjs/common';
import { CliTokenController } from './cli-token.controller';
import { CliTokenService } from './cli-token.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CliTokenController],
  providers: [CliTokenService]
})
export class CliTokenModule {}
