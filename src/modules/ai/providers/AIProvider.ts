export interface GenerateOptions {
  prompt: string;
  systemInstruction?: string;
  model: string;
}

export interface ValidationResult {
  valid: boolean;
  provider: string;
  selectedModel: string;
  availableModels: string[];
  message?: string;
}

export interface HealthResult {
  authentication: boolean;
  connectivity: boolean;
  modelAvailability: boolean;
  quotaStatus: boolean;
}

export interface AIProvider {
  validateApiKey(apiKey: string): Promise<ValidationResult>;
  discoverModels(apiKey: string): Promise<string[]>;
  generateText(options: GenerateOptions, apiKey: string): Promise<string>;
  healthCheck(apiKey: string, model: string): Promise<HealthResult>;
}
