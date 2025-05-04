import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ContentItem {
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  source?: {
    type: string;
    media_type: string;
    data: string;
  };
}

class MessageItem {
  @IsString()
  role: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentItem)
  content: ContentItem[];
}

export class ClaudeRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageItem)
  messages: MessageItem[];

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  max_tokens?: number;
}
