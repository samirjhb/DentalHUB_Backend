import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  private phoneNumberId: string;
  private accessToken: string;
  private apiVersion: string;

  constructor(private configService: ConfigService) {
    // Obtener configuración de las variables de entorno
    this.phoneNumberId = this.configService.get<string>('WA_PHONE_NUMBER_ID');
    this.accessToken = this.configService.get<string>('CLOUD_API_ACCESS_TOKEN');
    this.apiVersion =
      this.configService.get<string>('CLOUD_API_VERSION') || 'v16.0';

    if (!this.phoneNumberId || !this.accessToken) {
      console.warn('WhatsApp API credentials not configured properly');
    }
  }

  async sendTextMessage(recipientNumber: string, message: string) {
    try {
      console.log('Sending WhatsApp message to:', recipientNumber);
      console.log('Message:', message);
      if (!this.phoneNumberId || !this.accessToken) {
        throw new Error('WhatsApp API credentials not configured');
      }

      // Construir la URL de la API Graph
      const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;

      // Construir el payload para enviar un mensaje de texto
      const payload = {
        messaging_product: 'whatsapp',
        to: recipientNumber,
        type: 'text',
        text: { body: message },
      };

      // Configurar los headers
      const headers = {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      };

      // Enviar la solicitud a la API
      const response = await axios.post(url, payload, { headers });
      console.log('Message sent successfully:', response.data);

      return response.data;
    } catch (error) {
      console.error(
        'Error sending WhatsApp message:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async sendTemplateMessage(
    recipientNumber: string,
    templateName: string,
    languageCode = 'es',
  ) {
    try {
      if (!this.phoneNumberId || !this.accessToken) {
        throw new Error('WhatsApp API credentials not configured');
      }

      // Construir la URL de la API Graph
      const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;

      // Construir el payload para enviar un mensaje de plantilla
      const payload = {
        messaging_product: 'whatsapp',
        to: recipientNumber,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
        },
      };

      // Configurar los headers
      const headers = {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      };

      // Enviar la solicitud a la API
      const response = await axios.post(url, payload, { headers });
      console.log('Template message sent successfully:', response.data);

      return response.data;
    } catch (error) {
      console.error(
        'Error sending WhatsApp template message:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async alertaCitaService() {
    const defaultRecipient = this.configService.get<string>(
      'DEFAULT_RECIPIENT_NUMBER',
    );

    if (!defaultRecipient) {
      throw new Error('No default recipient number configured');
    }

    // Enviar un mensaje de plantilla hello_world como ejemplo
    return this.sendTemplateMessage(defaultRecipient, 'hello_world', 'en_US');
  }

  async alertaCita(
    recipientNumber: string,
    patientName: string,
    dateTime: string,
  ) {
    const message = `Hola ${patientName}, le recordamos que tiene una cita programada para ${dateTime}. Por favor confirme su asistencia.`;
    return this.sendTextMessage(recipientNumber, message);
  }
}
