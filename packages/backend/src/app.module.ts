import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandsModule } from './commands/commands.module';
import { ScriptsModule } from './scripts/scripts.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CliTokenModule } from './cli-token/cli-token.module';

@Module({
  imports: [
    CommandsModule,
    ScriptsModule,
    AuthModule,
    PrismaModule,
    UserModule,
    CliTokenModule
  ],
})
export class AppModule { }
