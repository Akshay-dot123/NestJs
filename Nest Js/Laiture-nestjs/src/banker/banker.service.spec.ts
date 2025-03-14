import { Test, TestingModule } from '@nestjs/testing';
import { BankerService } from './banker.service';

describe('BankerService', () => {
  let service: BankerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankerService],
    }).compile();

    service = module.get<BankerService>(BankerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
