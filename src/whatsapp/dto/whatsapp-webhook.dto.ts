import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class ContactDto {
  @ApiProperty({
    description: 'Número de teléfono de entrada',
    example: '+56977466589',
  })
  @IsString()
  input: string;

  @ApiProperty({
    description: 'ID de WhatsApp',
    example: '56977466589',
  })
  @IsString()
  wa_id: string;
}

class MessageDto {
  @ApiProperty({
    description: 'ID del mensaje de WhatsApp',
    example: 'wamid.HBgLNTY5Nzc0NjY1ODkVAgARGBI1NDlDODYwRkJCNUFFN0ExNzQA',
  })
  @IsString()
  id: string;
}

export class WhatsappWebhookDto {
  @ApiProperty({
    description: 'Producto de mensajería',
    example: 'whatsapp',
  })
  @IsString()
  @IsNotEmpty()
  messaging_product: string;

  @ApiProperty({
    description: 'Información de contactos',
    type: [ContactDto],
  })
  @IsArray()
  @IsOptional()
  contacts?: ContactDto[];

  @ApiProperty({
    description: 'Información de mensajes',
    type: [MessageDto],
  })
  @IsArray()
  @IsOptional()
  messages?: MessageDto[];
}
