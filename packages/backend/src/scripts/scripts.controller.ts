import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import CreateScriptDto from './dto/create-script-dto';
import UpdateScriptDto from './dto/update-script-dto';
@Controller('scripts')
export class ScriptsController {
    constructor(private readonly scriptsService: ScriptsService) {}

    @Get()
    async getScripts() {
        return this.scriptsService.getScripts();
    }

    @Get(':id')
    async getScript(@Param('id') id: string) {
        return this.scriptsService.getScript(id);
    }

    @Post()
    async createScript(@Body() script: CreateScriptDto) {
        return this.scriptsService.createScript(script);
    }

    @Put(':id')
    async updateScript(@Param('id') id: string, @Body() script: UpdateScriptDto) {
        return this.scriptsService.updateScript(id, script);
    }

    @Delete
    (':id')
    async deleteScript(@Param('id') id: string) {
        return this.scriptsService.deleteScript(id);
    }
}
