import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticEvaluationService } from './diagnostic-evaluation.service';

describe('DiagnosticEvaluationService', () => {
  let service: DiagnosticEvaluationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosticEvaluationService],
    }).compile();

    service = module.get<DiagnosticEvaluationService>(DiagnosticEvaluationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
