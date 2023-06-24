import { Injectable } from '@nestjs/common';
import { CreateDiagnosticEvaluationDto } from './dto/create-diagnostic-evaluation.dto';
import { UpdateDiagnosticEvaluationDto } from './dto/update-diagnostic-evaluation.dto';

@Injectable()
export class DiagnosticEvaluationService {
  create(createDiagnosticEvaluationDto: CreateDiagnosticEvaluationDto) {
    return 'This action adds a new diagnosticEvaluation';
  }

  findAll() {
    return `This action returns all diagnosticEvaluation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diagnosticEvaluation`;
  }

  update(id: number, updateDiagnosticEvaluationDto: UpdateDiagnosticEvaluationDto) {
    return `This action updates a #${id} diagnosticEvaluation`;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnosticEvaluation`;
  }
}
