import { Test, TestingModule } from '@nestjs/testing';
import { SpecialistController } from './specialist.controller';
import { SpecialistService } from './specialist.service';

describe('SpecialistController', () => {
  let controller: SpecialistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialistController],
      providers: [SpecialistService],
    }).compile();

    controller = module.get<SpecialistController>(SpecialistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
