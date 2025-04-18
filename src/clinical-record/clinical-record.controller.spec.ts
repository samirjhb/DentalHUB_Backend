import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalRecordController } from './clinical-record.controller';
import { ClinicalRecordService } from './clinical-record.service';

describe('ClinicalRecordController', () => {
  let controller: ClinicalRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicalRecordController],
      providers: [ClinicalRecordService],
    }).compile();

    controller = module.get<ClinicalRecordController>(ClinicalRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
