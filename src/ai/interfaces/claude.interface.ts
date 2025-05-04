export interface ClaudeContentItem {
  type: string;
  text?: string;
  source?: {
    type: string;
    media_type: string;
    data: string;
  };
}

export interface ClaudeMessage {
  role: string;
  content: ClaudeContentItem[];
}

export interface ClaudeRequest {
  messages: ClaudeMessage[];
  model?: string;
  max_tokens?: number;
}

export interface ClaudeResponse {
  id: string;
  type: string;
  role: string;
  content: ClaudeContentItem[];
  model: string;
  stop_reason: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}
