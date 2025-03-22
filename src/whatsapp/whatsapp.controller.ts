import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from './dto/send-message.dto';
import { AlertaCitaDto } from './dto/alerta-cita.dto';
import { SendTemplateDto } from './dto/send-template.dto';
import { WhatsappWebhookDto } from './dto/whatsapp-webhook.dto';

@ApiTags('Whatsapp')
@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('test')
  @ApiOperation({
    summary: 'Enviar un mensaje de prueba usando la configuración por defecto',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensaje de prueba enviado correctamente',
  })
  alertaCitaController(): any {
    return this.whatsappService.alertaCitaService();
  }

  @Post('send-message')
  @ApiOperation({
    summary: 'Enviar un mensaje de WhatsApp a un número específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensaje enviado correctamente',
  })
  @ApiBody({ type: SendMessageDto })
  async sendMessage(@Body() sendMessageDto: SendMessageDto): Promise<any> {
    console.log('Received DTO:', sendMessageDto);
    console.log('Sending WhatsApp message to:', sendMessageDto.phoneNumber);
    console.log('Message:', sendMessageDto.message);
    return this.whatsappService.sendTextMessage(
      sendMessageDto.phoneNumber,
      sendMessageDto.message,
    );
  }

  @Post('webhook')
  @ApiOperation({
    summary: 'Recibir notificaciones de WhatsApp (Webhook)',
  })
  @ApiResponse({
    status: 200,
    description: 'Notificación recibida correctamente',
  })
  @ApiBody({ type: WhatsappWebhookDto })
  // Desactivamos la validación estricta para este endpoint
  @UsePipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  )
  async receiveWebhook(@Body() webhookData: any): Promise<any> {
    console.log('Received webhook data:', webhookData);

    // Extraer el número de teléfono del primer contacto si existe
    const phoneNumber = webhookData.contacts?.[0]?.input;

    if (phoneNumber) {
      // Enviar un mensaje de confirmación
      await this.whatsappService.sendTextMessage(
        phoneNumber,
        'Hemos recibido tu mensaje. Gracias por contactarnos.',
      );
    }

    return { status: 'success', message: 'Webhook received' };
  }

  // Endpoint específico para recibir el formato exacto que estás enviando
  @Post('message-status')
  @ApiOperation({
    summary: 'Recibir estado de mensajes de WhatsApp',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado de mensaje recibido correctamente',
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: false, // No transformamos para mantener el formato original
    }),
  )
  async receiveMessageStatus(@Body() rawData: any): Promise<any> {
    console.log('Received message status:', rawData);
    // Aquí puedes procesar el estado del mensaje como necesites
    return {
      received: true,
      timestamp: new Date().toISOString(),
      data: rawData,
    };
  }

  @Post('send-template')
  @ApiOperation({
    summary: 'Enviar un mensaje de plantilla de WhatsApp',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensaje de plantilla enviado correctamente',
  })
  @ApiBody({ type: SendTemplateDto })
  async sendTemplate(@Body() sendTemplateDto: SendTemplateDto): Promise<any> {
    return this.whatsappService.sendTemplateMessage(
      sendTemplateDto.phoneNumber,
      sendTemplateDto.templateName,
      sendTemplateDto.languageCode,
    );
  }

  @Post('alerta-cita')
  @ApiOperation({ summary: 'Enviar una alerta de cita a un paciente' })
  @ApiResponse({
    status: 200,
    description: 'Alerta de cita enviada correctamente',
  })
  @ApiBody({ type: AlertaCitaDto })
  async alertaCita(@Body() alertaCitaDto: AlertaCitaDto): Promise<any> {
    return this.whatsappService.alertaCita(
      alertaCitaDto.phoneNumber,
      alertaCitaDto.patientName,
      alertaCitaDto.dateTime,
    );
  }
}
