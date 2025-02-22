import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { ScriptsModule } from './scripts/scripts.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommandsModule,
    ScriptsModule,
    AuthModule,
    PrismaModule,
    UserModule
  ],
})
export class AppModule { }
