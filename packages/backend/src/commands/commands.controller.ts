import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandsService } from './commands.service';
import CreateCommandDto from './dtos/create-command-dto';
import UpdateCommandDto from './dtos/update-command-dto';

@Controller('commands')
export class CommandsController {
    constructor(private readonly commandsService: CommandsService) {}

    @Get()
    async getCommands() {
        return this.commandsService.getCommands();
    }

    @Get(':id')
    async getCommand(@Param('id') id: string) {
        return this.commandsService.getCommand(id);
    }

    @Post()
    async createCommand(@Body() command: CreateCommandDto) {
        return this.commandsService.createCommand(command);
    }

    @Put(':id')
    async updateCommand(@Param('id') id: string, @Body() command: UpdateCommandDto) {
        return this.commandsService.updateCommand(id, command);
    }

    @Delete(':id')
    async deleteCommand(@Param('id') id: string) {
        return this.commandsService.deleteCommand(id);
    }
}
