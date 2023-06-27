import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticEvaluationController } from './diagnostic-evaluation.controller';
import { DiagnosticEvaluationService } from './diagnostic-evaluation.service';

describe('DiagnosticEvaluationController', () => {
  let controller: DiagnosticEvaluationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosticEvaluationController],
      providers: [DiagnosticEvaluationService],
    }).compile();

    controller = module.get<DiagnosticEvaluationController>(DiagnosticEvaluationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
