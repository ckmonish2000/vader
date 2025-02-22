import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CliTokenService } from './cli-token.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AuthUser } from 'src/types/AuthUser';

@Controller('cli-token')
export class CliTokenController {
    constructor(private readonly cliTokenService: CliTokenService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    createCliToken(@User() user: AuthUser) {
        return this.cliTokenService.createCliToken(user);
    }
}
