import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-diagnostic-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-diagnostic-evaluation.dto';

@Injectable()
export class DiagnosticEvaluationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createDiagnosticEvaluationDto: CreateEvaluationDto) {
    return 'This action adds a new diagnosticEvaluation';
  }

  findAll() {
    return `This action returns all diagnosticEvaluation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diagnosticEvaluation`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateDiagnosticEvaluationDto: UpdateEvaluationDto) {
    return `This action updates a #${id} diagnosticEvaluation`;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnosticEvaluation`;
  }
}
