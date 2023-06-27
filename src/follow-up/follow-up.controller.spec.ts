import { Test, TestingModule } from '@nestjs/testing';
import { FollowUpController } from './follow-up.controller';
import { FollowUpService } from './follow-up.service';

describe('FollowUpController', () => {
  let controller: FollowUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowUpController],
      providers: [FollowUpService],
    }).compile();

    controller = module.get<FollowUpController>(FollowUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
