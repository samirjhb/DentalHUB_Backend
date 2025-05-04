import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { ClaudeRequestDto } from './dto/claude-request.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Chat con el asistente dental AI' })
  @ApiResponse({
    status: 200,
    description: 'Respuesta del asistente dental AI',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud inválida',
  })
  @ApiResponse({
    status: 500,
    description: 'Error del servidor',
  })
  async chatWithClaude(@Body() claudeRequestDto: ClaudeRequestDto) {
    return this.aiService.chatWithClaude(claudeRequestDto);
  }
}
