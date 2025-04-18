import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAppointmentDateDto {
  @ApiProperty({
    description: 'Nueva fecha de cita para el tratamiento',
    example: '2025-04-25T14:00:00.000Z',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  date: Date;
}
