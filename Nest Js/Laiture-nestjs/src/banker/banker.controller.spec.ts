import { Test, TestingModule } from '@nestjs/testing';
import { BankerController } from './banker.controller';

describe('BankerController', () => {
  let controller: BankerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankerController],
    }).compile();

    controller = module.get<BankerController>(BankerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
