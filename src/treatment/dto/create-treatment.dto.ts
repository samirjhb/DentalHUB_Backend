import { ApiProperty } from '@nestjs/swagger';

export class CreateTreatmentDto {
  @ApiProperty()
  patient: string; // ID del paciente asociado al tratamiento

  @ApiProperty()
  name: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  description: string;
}
