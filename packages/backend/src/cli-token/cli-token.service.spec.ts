import { Test, TestingModule } from '@nestjs/testing';
import { CliTokenService } from './cli-token.service';

describe('CliTokenService', () => {
  let service: CliTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CliTokenService],
    }).compile();

    service = module.get<CliTokenService>(CliTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
