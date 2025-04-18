import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClinicalRecordService } from './clinical-record.service';
import { CreateClinicalRecordDto } from './dto/create-clinical-record.dto';
import { UpdateClinicalRecordDto } from './dto/update-clinical-record.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AddDepositDto } from './dto/add-deposit.dto';
import { UpdateAppointmentDateDto } from './dto/update-appointment-date.dto';
import { AddTreatmentDto } from './dto/add-treatment.dto';
import { FilterClinicalRecordDto } from './dto/filter-clinical-record.dto';

@ApiTags('Ficha Clínica')
@Controller('clinical-record')
export class ClinicalRecordController {
  constructor(private readonly clinicalRecordService: ClinicalRecordService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ficha clínica' })
  @ApiResponse({
    status: 201,
    description: 'Ficha clínica creada correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  create(@Body() createClinicalRecordDto: CreateClinicalRecordDto) {
    return this.clinicalRecordService.create(createClinicalRecordDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las fichas clínicas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de fichas clínicas obtenida correctamente',
  })
  findAll() {
    return this.clinicalRecordService.findAll();
  }

  @Get('filter')
  @ApiOperation({
    summary: 'Filtrar fichas clínicas por diferentes criterios',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de fichas clínicas filtrada correctamente',
  })
  findWithFilters(@Query() filterDto: FilterClinicalRecordDto) {
    return this.clinicalRecordService.findWithFilters(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ficha clínica por ID' })
  @ApiResponse({ status: 200, description: 'Ficha clínica encontrada' })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  findOne(@Param('id') id: string) {
    return this.clinicalRecordService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una ficha clínica' })
  @ApiResponse({
    status: 200,
    description: 'Ficha clínica actualizada correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  update(
    @Param('id') id: string,
    @Body() updateClinicalRecordDto: UpdateClinicalRecordDto,
  ) {
    return this.clinicalRecordService.update(id, updateClinicalRecordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ficha clínica' })
  @ApiResponse({
    status: 200,
    description: 'Ficha clínica eliminada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.clinicalRecordService.remove(id);
  }

  @Patch(':id/treatments/:treatmentIndex/status')
  @ApiOperation({
    summary: 'Actualizar el estado de un tratamiento específico',
  })
  @ApiResponse({ status: 200, description: 'Estado actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Estado no válido' })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  @ApiParam({
    name: 'treatmentIndex',
    description: 'Índice del tratamiento a actualizar',
  })
  updateStatus(
    @Param('id') id: string,
    @Param('treatmentIndex') treatmentIndex: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.clinicalRecordService.updateStatus(
      id,
      updateStatusDto.status,
      treatmentIndex,
    );
  }

  @Post(':id/treatments/:treatmentIndex/deposit')
  @ApiOperation({
    summary: 'Registrar un abono a un tratamiento específico',
  })
  @ApiResponse({ status: 200, description: 'Abono registrado correctamente' })
  @ApiResponse({ status: 400, description: 'Monto inválido' })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  @ApiParam({
    name: 'treatmentIndex',
    description: 'Índice del tratamiento a actualizar',
  })
  addDeposit(
    @Param('id') id: string,
    @Param('treatmentIndex') treatmentIndex: number,
    @Body() addDepositDto: AddDepositDto,
  ) {
    return this.clinicalRecordService.addDeposit(
      id,
      addDepositDto.amount,
      treatmentIndex,
    );
  }

  @Post(':id/treatments')
  @ApiOperation({
    summary: 'Agregar un nuevo tratamiento a una ficha clínica existente',
  })
  @ApiResponse({
    status: 201,
    description: 'Tratamiento agregado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  addTreatment(
    @Param('id') id: string,
    @Body() addTreatmentDto: AddTreatmentDto,
  ) {
    return this.clinicalRecordService.addTreatment(id, addTreatmentDto);
  }

  @Delete(':id/treatments/:treatmentIndex')
  @ApiOperation({
    summary: 'Eliminar un tratamiento específico de una ficha clínica',
  })
  @ApiResponse({
    status: 200,
    description: 'Tratamiento eliminado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Tratamiento no encontrado' })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  @ApiParam({
    name: 'treatmentIndex',
    description: 'Índice del tratamiento a eliminar',
  })
  removeTreatment(
    @Param('id') id: string,
    @Param('treatmentIndex') treatmentIndex: number,
  ) {
    return this.clinicalRecordService.removeTreatment(id, treatmentIndex);
  }

  @Get(':id/treatments/:treatmentIndex/balance')
  @ApiOperation({
    summary: 'Calcular el saldo pendiente de un tratamiento específico',
  })
  @ApiResponse({ status: 200, description: 'Saldo calculado correctamente' })
  @ApiResponse({ status: 400, description: 'Tratamiento no encontrado' })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  @ApiParam({
    name: 'treatmentIndex',
    description: 'Índice del tratamiento',
  })
  calculatePendingBalance(
    @Param('id') id: string,
    @Param('treatmentIndex') treatmentIndex: number,
  ) {
    return this.clinicalRecordService.calculatePendingBalance(
      id,
      treatmentIndex,
    );
  }

  @Get(':id/balance')
  @ApiOperation({
    summary: 'Calcular el saldo pendiente total de una ficha clínica',
  })
  @ApiResponse({
    status: 200,
    description: 'Saldo total calculado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  calculateTotalPendingBalance(@Param('id') id: string) {
    return this.clinicalRecordService.calculateTotalPendingBalance(id);
  }

  @Patch(':id/treatments/:treatmentIndex/appointment-date')
  @ApiOperation({
    summary: 'Actualizar la fecha de cita de un tratamiento específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Fecha de cita actualizada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Ficha clínica no encontrada' })
  @ApiParam({ name: 'id', description: 'ID de la ficha clínica' })
  @ApiParam({
    name: 'treatmentIndex',
    description: 'Índice del tratamiento a actualizar',
  })
  updateAppointmentDate(
    @Param('id') id: string,
    @Param('treatmentIndex') treatmentIndex: number,
    @Body() updateAppointmentDateDto: UpdateAppointmentDateDto,
  ) {
    return this.clinicalRecordService.updateAppointmentDate(
      id,
      updateAppointmentDateDto.date,
      treatmentIndex,
    );
  }
}
