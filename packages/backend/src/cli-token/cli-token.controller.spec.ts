import { Test, TestingModule } from '@nestjs/testing';
import { CliTokenController } from './cli-token.controller';

describe('CliTokenController', () => {
  let controller: CliTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CliTokenController],
    }).compile();

    controller = module.get<CliTokenController>(CliTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
