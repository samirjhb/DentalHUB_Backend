import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiagnosticEvaluationService } from './diagnostic-evaluation.service';
import { CreateDiagnosticEvaluationDto } from './dto/create-diagnostic-evaluation.dto';
import { UpdateDiagnosticEvaluationDto } from './dto/update-diagnostic-evaluation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Evaluación y diagnóstico')
@Controller('diagnostic-evaluation')
export class DiagnosticEvaluationController {
  constructor(
    private readonly diagnosticEvaluationService: DiagnosticEvaluationService,
  ) {}

  @Post()
  create(@Body() createDiagnosticEvaluationDto: CreateDiagnosticEvaluationDto) {
    return this.diagnosticEvaluationService.create(
      createDiagnosticEvaluationDto,
    );
  }

  @Get()
  findAll() {
    return this.diagnosticEvaluationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosticEvaluationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiagnosticEvaluationDto: UpdateDiagnosticEvaluationDto,
  ) {
    return this.diagnosticEvaluationService.update(
      +id,
      updateDiagnosticEvaluationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosticEvaluationService.remove(+id);
  }
}
