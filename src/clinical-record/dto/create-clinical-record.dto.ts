import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DentalTreatmentDto {
  @ApiProperty({
    description: 'Diagnóstico odontológico',
    example: 'Caries profunda con compromiso pulpar',
    required: true,
  })
  @IsString()
  diagnosis: string;

  @ApiProperty({
    description: 'URLs o identificadores de las radiografías',
    example: [
      'https://storage.example.com/radiografia-pieza36-20250418.jpg',
      'https://storage.example.com/radiografia-pieza36-lateral-20250418.jpg',
    ],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  radiography?: string[];

  @ApiProperty({
    description: 'Número de la pieza dental a tratar',
    example: '36',
    required: true,
  })
  @IsString()
  toothNumber: string;

  @ApiProperty({
    description: 'Tratamiento a realizar',
    example: 'Endodoncia y corona de porcelana',
    required: true,
  })
  @IsString()
  treatment: string;

  @ApiProperty({
    description: 'Precio del tratamiento',
    example: 250000,
    required: true,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Estado del tratamiento',
    example: 'Pendiente',
    enum: ['Pendiente', 'En proceso', 'Completado', 'Cancelado'],
    default: 'Pendiente',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Monto abonado',
    example: 50000,
    default: 0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  deposit?: number;

  @ApiProperty({
    description: 'Fecha de la cita',
    example: '2025-04-25T14:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  appointmentDate?: Date;

  @ApiProperty({
    description: 'Observaciones adicionales',
    example: 'Paciente con hipertensión controlada',
    required: false,
  })
  @IsString()
  @IsOptional()
  observations?: string;
}

export class CreateClinicalRecordDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: '6579f236c25e43b9b9e0c123',
    required: true,
  })
  @IsMongoId()
  patient: string;

  @ApiProperty({
    description: 'Lista de tratamientos dentales',
    type: [DentalTreatmentDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DentalTreatmentDto)
  treatments: DentalTreatmentDto[];

  @ApiProperty({
    description: 'Archivos adjuntos (URLs o identificadores)',
    example: ['https://storage.example.com/consentimiento-20250418.pdf'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsString({ each: true })
  attachments?: string[];

  @ApiProperty({
    description: 'Nombre del dentista',
    example: 'Dr. Juan Pérez',
    required: true,
  })
  @IsString()
  dentist: string;
}
