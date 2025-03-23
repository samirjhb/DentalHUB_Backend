import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsDateString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Nombre completo del paciente',
    example: 'Juan Pérez González',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'RUT del paciente (formato chileno)',
    example: '12.345.678-9',
    required: true,
  })
  @IsString()
  rut: string;

  @ApiProperty({
    description: 'Número de teléfono celular del paciente',
    example: 56912345678,
    required: true,
    type: Number,
  })
  @IsNumber()
  cel: number;

  @ApiProperty({
    description: 'Correo electrónico del paciente',
    example: 'juan.perez@ejemplo.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Número de ficha o registro médico del paciente',
    example: 'DH-2025-001',
    required: true,
  })
  @IsString()
  record: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del paciente',
    example: '1990-01-15T00:00:00.000Z',
    required: true,
    type: String,
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description:
      'Lista de IDs de evaluaciones diagnósticas asociadas al paciente',
    example: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  evaluations?: string[];

  @ApiProperty({
    description: 'Lista de IDs de tratamientos asociados al paciente',
    example: ['60d21b4667d0d8992e610c87', '60d21b4667d0d8992e610c88'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  treatments?: string[];
}
