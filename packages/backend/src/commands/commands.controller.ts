import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommandsService } from './commands.service';
import CreateCommandDto from './dtos/create-command-dto';
import UpdateCommandDto from './dtos/update-command-dto';
import { CommandType } from '@prisma/client';
import GetCommandDto from './dtos/get-command-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { throwHTTPErr } from 'src/utils';

@Controller('commands')
export class CommandsController {
    constructor(private readonly commandsService: CommandsService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getCommands(@Query() query?: GetCommandDto) {
        const take = query && typeof query.take === 'string' ? parseInt(query.take) : query?.take;
        return this.commandsService.getCommands({ ...query, take });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getCommand(@Param('id') id: string) {
        const cmd = await this.commandsService.getCommand(id)
        if (E.isLeft(cmd)) {
            throwHTTPErr(cmd.left);
        }
        return cmd.right;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createCommand(@Body() command: CreateCommandDto) {
        return this.commandsService.createCommand(command);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateCommand(@Param('id') id: string, @Body() command: UpdateCommandDto) {
        const cmd = await this.commandsService.updateCommand(id, command);
        if (E.isLeft(cmd)) {
            throwHTTPErr(cmd.left);
        }
        return cmd.right;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteCommand(@Param('id') id: string) {
        const cmd = await this.commandsService.deleteCommand(id);
        if (E.isLeft(cmd)) {
            throwHTTPErr(cmd.left);
        }
        return cmd.right;
    }
}
