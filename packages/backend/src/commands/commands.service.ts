import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import CreateCommandDto from './dtos/create-command-dto';
import UpdateCommandDto from './dtos/update-command-dto';

@Injectable()
export class CommandsService {
    constructor(private readonly prisma: PrismaService) {}

    async getCommand(id: string) {
        return this.prisma.command.findUnique({
            where: { id }
        });
    }

    async getCommands() {
        return this.prisma.command.findMany({});
    }

    async updateCommand(id: string, command: UpdateCommandDto) {
        return this.prisma.command.update({
            where: { id },
            data: command
        });
    }

    async createCommand(command: CreateCommandDto) {
        return this.prisma.command.create({
            data: command
        });
    }
    
    async deleteCommand(id: string) {
        return this.prisma.command.delete({
            where: { id }
        });
    }
}
