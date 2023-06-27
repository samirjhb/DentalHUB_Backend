import { PartialType } from '@nestjs/swagger';
import { CreateEvaluationDto } from './create-diagnostic-evaluation.dto';

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}
