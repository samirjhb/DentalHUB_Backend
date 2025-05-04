import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ClaudeRequestDto } from './dto/claude-request.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly ollamaApiUrl: string;
  private readonly ollamaModel: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Configuración para Ollama (modelo local)
    this.ollamaApiUrl =
      this.configService.get<string>('OLLAMA_API_URL') ||
      'http://localhost:11434/api/chat';
    this.ollamaModel =
      this.configService.get<string>('OLLAMA_MODEL') || 'llama3';

    this.logger.log(
      `Usando Ollama API en: ${this.ollamaApiUrl} con modelo: ${this.ollamaModel}`,
    );
  }

  async chatWithClaude(claudeRequestDto: ClaudeRequestDto) {
    try {
      // Convertir el formato de mensajes de Claude a formato compatible con Ollama
      const ollamaMessages = this.convertToOllamaFormat(
        claudeRequestDto.messages,
      );

      const requestBody = {
        model: this.ollamaModel,
        messages: ollamaMessages,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: claudeRequestDto.max_tokens || 4000,
        },
        system:
          'Eres un asistente dental especializado. Tu objetivo es proporcionar información precisa y útil sobre salud bucal, tratamientos dentales y prácticas de higiene oral. Puedes analizar imágenes de radiografías dentales, fotografías de dientes o encías para identificar posibles problemas. Recuerda que no estás reemplazando el diagnóstico profesional y siempre debes recomendar consultar a un dentista para evaluaciones precisas. Adapta tu lenguaje para ser comprensible por pacientes sin conocimientos técnicos, pero mantén la precisión científica.',
      };

      this.logger.log(
        `Enviando solicitud a Ollama: ${JSON.stringify(requestBody, null, 2)}`,
      );

      const response = await lastValueFrom(
        this.httpService.post<any>(
          `${this.ollamaApiUrl}/api/chat`,
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      this.logger.log(`Respuesta de Ollama recibida`);

      return {
        success: true,
        content: [
          {
            type: 'text',
            text:
              response.data.message?.content ||
              response.data.response ||
              'No se pudo obtener una respuesta',
          },
        ],
      };
    } catch (error) {
      this.logger.error(
        `Error al comunicarse con Ollama API: ${
          error.response?.data || error.message
        }`,
      );

      throw new HttpException(
        {
          success: false,
          message: 'Error al comunicarse con Ollama API',
          error: error.response?.data || error.message,
        },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Método para convertir mensajes del formato Claude al formato compatible con Ollama
  private convertToOllamaFormat(claudeMessages: any[]): any[] {
    const ollamaMessages = [];

    for (const message of claudeMessages) {
      const role = message.role === 'user' ? 'user' : 'assistant';
      let content = '';

      // Procesar el contenido del mensaje
      for (const item of message.content) {
        if (item.type === 'text') {
          content += item.text;
        } else if (item.type === 'image' && item.source && item.source.data) {
          // Ollama no soporta imágenes directamente
          // Añadimos una nota sobre la imagen adjunta
          content += '[Se adjuntó una imagen para análisis]';
        }
      }

      ollamaMessages.push({
        role: role,
        content: content,
      });
    }

    return ollamaMessages;
  }
}
