import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateScriptDto from './dto/create-script-dto';
import UpdateCommandDto from 'src/commands/dtos/update-command-dto';
import UpdateScriptDto from './dto/update-script-dto';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { RESTError } from 'src/types/RESTError';

@Injectable()
export class ScriptsService {
    constructor(private readonly prisma: PrismaService) { }

    async getScripts({ take = 10, cursor = undefined }: { take?: number, cursor?: string }) {
        
        if (!cursor) {
            return this.prisma.script.findMany({
                take,
                orderBy: {
                    id: 'asc'
                },
                include: {
                    commands: {
                        include: {
                            command: true,
                        },
                    },
                },
            });
        }

        return this.prisma.script.findMany({
            take,
            skip: 1,
            include: {
                commands: {
                    include: {
                        command: true,
                    },
                },
            },
            cursor: { id: cursor },
            orderBy: {
                id: 'asc'
            }
        });
    }

    async getScript(id: string) {
        const script = await this.prisma.script.findUnique({
            where: { id },
            include: {
                commands: {
                    include: {
                        command: true,
                    },
                },
            },
        })

        if (!script) {
            return E.left(<RESTError>{
                message: 'scripts/not_found',
                statusCode: HttpStatus.NOT_FOUND,
            });
        }

        return E.right(script);
    }

    async createScript(script: CreateScriptDto) {
        try {
            const newScript = await this.prisma.script.create({
                data: {
                    name: script.name,
                },
            });

            if (!newScript) {
                return E.left(<RESTError>{
                    message: 'scripts/create_failed',
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                });
            }

            const newScriptCommands = await this.prisma.scriptCommand.createMany({
                data: script.commands.map((command, index) => ({
                    scriptId: newScript.id,
                    commandId: command,
                    order: index,
                })),
            });

            return E.right({
                ...newScript,
                commands: newScriptCommands,
            });
        } catch (error) {
            return E.left(<RESTError>{
                message: 'scripts/create_failed',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }

    async deleteScript(id: string) {
        try {
            const script = await this.getScript(id);
            if (E.isLeft(script)) {
                return script;
            }

            await this.prisma.script.delete({
                where: { id },
            });

            return E.right(script.right);
        } catch (error) {
            return E.left(<RESTError>{
                message: 'scripts/delete_failed',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }

    async updateScript(id: string, script: UpdateScriptDto) {
        try{
            const scriptToUpdate = await this.getScript(id);
            if (E.isLeft(scriptToUpdate)) {
                return scriptToUpdate;
            }
    
            if (!scriptToUpdate) {
                return E.left(<RESTError>{
                    message: 'scripts/not_found',
                    statusCode: HttpStatus.NOT_FOUND,
                });
            }
    
            if (script?.name) {
                scriptToUpdate.right.name = script.name;
                await this.prisma.script.update({
                    where: { id },
                    data: { name: script.name }
                });
            }
    
    
            if (script?.commands) {
                await this.prisma.script.update({
                    where: { id },
                    data: { updateCounter: { increment: 1 } }
                });
                
                await this.prisma.scriptCommand.deleteMany({
                    where: { scriptId: id },
                });
    
                await this.prisma.scriptCommand.createMany({
                    data: script.commands.map((command, index) => ({
                        scriptId: id,
                        commandId: command,
                        order: index,
                    })),
                });
            }
    
            return E.right(scriptToUpdate);
        }catch(err){
            return E.left(<RESTError>{
                message: 'scripts/update_failed',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
