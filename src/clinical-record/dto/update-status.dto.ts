import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'Estado del tratamiento',
    example: 'En proceso',
    enum: ['Pendiente', 'En proceso', 'Completado', 'Cancelado'],
    required: true,
  })
  @IsEnum(['Pendiente', 'En proceso', 'Completado', 'Cancelado'])
  status: string;
}
