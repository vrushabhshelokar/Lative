export type ThemeType = 'system' | 'light' | 'dark';

export interface AppSettings {
  geminiApiKey: string;
  theme: ThemeType;
  floatingButtonEnabled: boolean;
}
