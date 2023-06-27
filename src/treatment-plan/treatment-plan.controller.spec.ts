import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentPlanController } from './treatment-plan.controller';
import { TreatmentPlanService } from './treatment-plan.service';

describe('TreatmentPlanController', () => {
  let controller: TreatmentPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentPlanController],
      providers: [TreatmentPlanService],
    }).compile();

    controller = module.get<TreatmentPlanController>(TreatmentPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
