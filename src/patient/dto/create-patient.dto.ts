import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  rut: string;

  @ApiProperty()
  cel: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  record: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  evaluations: string[]; // Lista de IDs de evaluaciones asociadas al paciente

  @ApiProperty()
  treatments: string[]; // Lista de IDs de tratamientos asociados al paciente
}
