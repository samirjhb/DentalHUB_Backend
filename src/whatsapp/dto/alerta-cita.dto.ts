import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AlertaCitaDto {
  @ApiProperty({
    description: 'Número de teléfono del paciente (incluir código de país)',
    example: '+56977466589',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Nombre del paciente',
    example: 'Juan Pérez',
  })
  @IsNotEmpty()
  @IsString()
  patientName: string;

  @ApiProperty({
    description: 'Fecha y hora de la cita',
    example: '25 de marzo a las 15:30 hrs',
  })
  @IsNotEmpty()
  @IsString()
  dateTime: string;
}
