import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentPlanService } from './treatment-plan.service';

describe('TreatmentPlanService', () => {
  let service: TreatmentPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentPlanService],
    }).compile();

    service = module.get<TreatmentPlanService>(TreatmentPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
