import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalRecordService } from './clinical-record.service';

describe('ClinicalRecordService', () => {
  let service: ClinicalRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicalRecordService],
    }).compile();

    service = module.get<ClinicalRecordService>(ClinicalRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
