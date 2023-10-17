import { Test, TestingModule } from '@nestjs/testing';
import { SyncGateway } from './sync.gateway';
import { SyncService } from './sync.service';

describe('SyncGateway', () => {
  let gateway: SyncGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyncGateway, SyncService],
    }).compile();

    gateway = module.get<SyncGateway>(SyncGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
