import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @ApiProperty({
    description: 'Nombre completo del paciente',
    example: 'Juan Pérez González',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'RUT del paciente (formato chileno)',
    example: '12.345.678-9',
    required: false,
  })
  rut?: string;

  @ApiProperty({
    description: 'Número de teléfono celular del paciente',
    example: 56912345678,
    required: false,
    type: Number,
  })
  cel?: number;

  @ApiProperty({
    description: 'Correo electrónico del paciente',
    example: 'juan.perez@ejemplo.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Número de ficha o registro médico del paciente',
    example: 'DH-2025-001',
    required: false,
  })
  record?: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del paciente',
    example: '1990-01-15T00:00:00.000Z',
    required: false,
  })
  birthDate?: string;

  @ApiProperty({
    description: 'Lista de IDs de evaluaciones diagnósticas asociadas',
    example: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'],
    required: false,
    type: [String],
  })
  evaluations?: string[];

  @ApiProperty({
    description: 'Lista de IDs de tratamientos asociados al paciente',
    example: ['60d21b4667d0d8992e610c87', '60d21b4667d0d8992e610c88'],
    required: false,
    type: [String],
  })
  treatments?: string[];
}
