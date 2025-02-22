import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CliTokenService } from 'src/cli-token/cli-token.service';
import * as O from 'fp-ts/Option';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly cliTokenService: CliTokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const token = headers.authorization;
    const cliToken = await this.cliTokenService.validateCliToken(token);

    if (O.isNone(cliToken)) {
      return false;
    }

    return true;
  }
}
