import { Module } from '@nestjs/common';
import { DiagnosticEvaluationService } from './diagnostic-evaluation.service';
import { DiagnosticEvaluationController } from './diagnostic-evaluation.controller';

@Module({
  controllers: [DiagnosticEvaluationController],
  providers: [DiagnosticEvaluationService]
})
export class DiagnosticEvaluationModule {}
