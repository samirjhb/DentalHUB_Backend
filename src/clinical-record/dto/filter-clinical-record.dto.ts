import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilterClinicalRecordDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: '6579f236c25e43b9b9e0c123',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  patientId?: string;

  @ApiProperty({
    description: 'Estado del tratamiento',
    example: 'En proceso',
    enum: ['Pendiente', 'En proceso', 'Completado', 'Cancelado'],
    required: false,
  })
  @IsEnum(['Pendiente', 'En proceso', 'Completado', 'Cancelado'])
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Fecha de inicio para filtrar por rango de fechas de cita',
    example: '2025-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({
    description: 'Fecha de fin para filtrar por rango de fechas de cita',
    example: '2025-12-31T23:59:59.999Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({
    description: 'Nombre del dentista',
    example: 'Dr. Juan Pérez',
    required: false,
  })
  @IsString()
  @IsOptional()
  dentist?: string;
}
