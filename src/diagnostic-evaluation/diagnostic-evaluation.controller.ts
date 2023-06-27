import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DiagnosticEvaluationService } from './diagnostic-evaluation.service';
import { CreateEvaluationDto } from './dto/create-diagnostic-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-diagnostic-evaluation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Evaluación y diagnóstico')
@Controller('diagnostic-evaluation')
export class DiagnosticEvaluationController {
  constructor(
    private readonly diagnosticEvaluationService: DiagnosticEvaluationService,
  ) {}

  @Post()
  create(@Body() createDiagnosticEvaluationDto: CreateEvaluationDto) {
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
    @Body() updateDiagnosticEvaluationDto: UpdateEvaluationDto,
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
