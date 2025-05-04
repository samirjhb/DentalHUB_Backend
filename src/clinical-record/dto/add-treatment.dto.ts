import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddTreatmentDto {
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
    required: true,
  })
  @IsDate()
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
