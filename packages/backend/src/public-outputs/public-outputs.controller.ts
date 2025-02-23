import { Controller, Get, Param } from '@nestjs/common';
import { PublicOutputsService } from './public-outputs.service';
import { throwHTTPErr } from 'src/utils';
import * as E from 'fp-ts/Either';

@Controller('public-outputs')
export class PublicOutputsController {
  constructor(private readonly publicOutputsService: PublicOutputsService) {}

  @Get(':id')
  async getPublicOutputs(@Param('id') id: string) {
    const publicOutputs = await this.publicOutputsService.getPublicOutputs(id);
    if (E.isLeft(publicOutputs)) {
      throwHTTPErr({
        message: publicOutputs.left,
        statusCode: 404,
      });
    }
    return publicOutputs.right;
  }
}
