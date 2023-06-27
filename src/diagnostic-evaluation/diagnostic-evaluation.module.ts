import { Module } from '@nestjs/common';
import { DiagnosticEvaluationService } from './diagnostic-evaluation.service';
import { DiagnosticEvaluationController } from './diagnostic-evaluation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DiagnosticEvaluation,
  DiagnosticEvaluationSchema,
} from './schema/diagnostic-evaluation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DiagnosticEvaluation.name,
        schema: DiagnosticEvaluationSchema,
      },
    ]),
  ],
  controllers: [DiagnosticEvaluationController],
  providers: [DiagnosticEvaluationService],
})
export class DiagnosticEvaluationModule {}
