import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    description: 'Número de teléfono del destinatario (incluir código de país)',
    example: '+56977466589',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Mensaje de texto a enviar',
    example: 'Hola, este es un mensaje de prueba',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
