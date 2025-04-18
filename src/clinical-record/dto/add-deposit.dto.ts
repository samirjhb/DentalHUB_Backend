import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class AddDepositDto {
  @ApiProperty({
    description: 'Monto del abono a registrar',
    example: 50000,
    required: true,
    minimum: 1,
  })
  @IsNumber()
  @Min(1, { message: 'El monto del abono debe ser mayor a cero' })
  amount: number;
}
