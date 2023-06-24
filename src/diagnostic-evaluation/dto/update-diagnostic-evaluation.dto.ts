import { PartialType } from '@nestjs/swagger';
import { CreateDiagnosticEvaluationDto } from './create-diagnostic-evaluation.dto';

export class UpdateDiagnosticEvaluationDto extends PartialType(CreateDiagnosticEvaluationDto) {}
