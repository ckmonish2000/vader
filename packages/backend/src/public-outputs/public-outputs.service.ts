import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as E from 'fp-ts/Either';

@Injectable()
export class PublicOutputsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPublicOutputs(commandOutputIds: string[]) {
    const publicOutputs = await this.prisma.publicOutput.create({
      data: {
        commandOutputIds,
      },
    });

    return publicOutputs;
  }

  async getPublicOutputs(id: string) {
    const publicOutputs = await this.prisma.publicOutput.findUnique({
      where: { id },
    });

    if (!publicOutputs) {
      return E.left('Public outputs not found');
    }

    // Step 1: Fetch all command outputs
    const commandOutputs = await Promise.all(
      publicOutputs.commandOutputIds.map((id) =>
        this.prisma.commandOutput.findUnique({
          where: { id },
        }),
      ),
    );

    if (commandOutputs.length === 0) {
      return E.left('No command outputs found');
    }

    // Step 2: Fetch script commands for each command output
    const withScriptCommands = await Promise.all(
      commandOutputs
        .filter((output) => output !== null)
        .map(async (output) => {
          const scriptCommand = await this.prisma.scriptCommand.findUnique({
            where: { id: output.scriptCommandId },
          });
          return { ...output, scriptCommand };
        }),
    );

    // Step 3: Fetch commands for each script command
    const fullData = await Promise.all(
      withScriptCommands.map(async (item) => {
        const command = await this.prisma.command.findUnique({
          where: { id: item.scriptCommand!.commandId },
        });
        const script = await this.prisma.script.findUnique({
          where: { id: item.scriptCommand!.scriptId },
        });
        return {
          scriptName: script!.name,
          publicCommand: command!.title,
          createAt: item.createdAt,
          commands: [
            {
              title: command!.title,
              command: command!.cmd,
              output: item.output,
              args: item.scriptCommand!.args,
            },
          ],
        };
      }),
    );

    return E.right({
      scriptName: fullData[0].scriptName,
      createAt: publicOutputs.createdAt,
      commands: fullData.map((item) => ({
        title: item.publicCommand,
        command: item.commands[0].command,
        output: item.commands[0].output,
        args: item.commands[0].args,
      })),
    });
  }
}
