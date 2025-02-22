import { Injectable, NotFoundException } from '@nestjs/common';
import PrismaService from 'src/prisma.service';
import CreateScriptDto from './dto/create-script-dto';
import UpdateCommandDto from 'src/commands/dtos/update-command-dto';
import UpdateScriptDto from './dto/update-script-dto';

@Injectable()
export class ScriptsService {
    constructor(private readonly prisma: PrismaService) {}

    async getScripts() {
        return this.prisma.script.findMany({
            include: {
                commands: {
                    include: {
                        command: true,
                    },
                },
            },
        });
    }

    async getScript(id: string) {
        return this.prisma.script.findUnique({
            where: { id },
            include: {
                commands: {
                    include: {
                        command: true,
                    },
                },
            },
        });
    }

    async createScript(script: CreateScriptDto) {
        const newScript = await this.prisma.script.create({
            data: {
                name: script.name,
            },
        });

        const newScriptCommands = await this.prisma.scriptCommand.createMany({
            data: script.commands.map((command, index) => ({
                scriptId: newScript.id,
                commandId: command,
                order: index,
            })),
        });

        return {
            ...newScript,
            commands: newScriptCommands,
        };
    }

    async deleteScript(id: string) {
        await this.prisma.script.delete({
            where: { id },
        });
    }

    async updateScript(id: string, script: UpdateScriptDto) {
        const scriptToUpdate = await this.prisma.script.findUnique({
            where: { id },
        });

        if(!scriptToUpdate) {
            throw new NotFoundException('Script not found');
        }
        
        if(script?.name) {
            scriptToUpdate.name = script.name;
            await this.prisma.script.update({
                where: { id },
                data: { name: script.name }
            });
        }
        
        
        if(script?.commands) {
            await this.prisma.scriptCommand.deleteMany({
                where: { scriptId: id },
            });

            const newScriptCommands = await this.prisma.scriptCommand.createMany({
                data: script.commands.map((command, index) => ({
                    scriptId: id,
                    commandId: command,
                    order: index,
                })),
            });
        }
        
        return scriptToUpdate;
    }
}
