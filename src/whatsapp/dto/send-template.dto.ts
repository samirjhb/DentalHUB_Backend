import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendTemplateDto {
  @ApiProperty({
    description: 'Número de teléfono del destinatario (incluir código de país)',
    example: '+56977466589',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Nombre de la plantilla a enviar',
    example: 'hello_world',
  })
  @IsNotEmpty()
  @IsString()
  templateName: string;

  @ApiProperty({
    description: 'Código de idioma para la plantilla',
    example: 'en_US',
    default: 'es',
  })
  @IsOptional()
  @IsString()
  languageCode?: string;
}
