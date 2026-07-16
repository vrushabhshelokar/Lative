export type ThemeType = 'system' | 'light' | 'dark';

export interface AIConfig {
  provider: 'google' | string;
  apiKey: string;
  selectedModel: string;
  availableModels: string[];
  sdkVersion: string;
  validatedAt: string;
}

export interface AppSettings {
  aiConfig: AIConfig;
  theme: ThemeType;
  floatingButtonEnabled: boolean;
}
