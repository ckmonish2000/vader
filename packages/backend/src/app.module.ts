import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandsModule } from './commands/commands.module';
import { ScriptsModule } from './scripts/scripts.module';

@Module({
  imports: [CommandsModule, ScriptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
