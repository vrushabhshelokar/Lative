import { safeStorage } from '@/lib/chrome';
import { AppSettings, ThemeType, AIConfig } from '../types';

export const DEFAULT_AI_CONFIG: AIConfig = {
  provider: 'google',
  apiKey: '',
  selectedModel: '',
  availableModels: [],
  sdkVersion: '@google/genai@0.21.0',
  validatedAt: ''
};

const DEFAULT_SETTINGS: AppSettings = {
  aiConfig: DEFAULT_AI_CONFIG,
  theme: 'system',
  floatingButtonEnabled: false
};

export const settingsStore = {
  /**
   * Retrieves all user settings preferences.
   */
  getSettings: async (): Promise<AppSettings> => {
    let aiConfig = (await safeStorage.get('aiConfig', null)) as AIConfig | null;
    
    // Backwards compatibility migration
    if (!aiConfig) {
      const legacyKey = (await safeStorage.get('geminiApiKey', '')) as string;
      aiConfig = {
        ...DEFAULT_AI_CONFIG,
        apiKey: legacyKey
      };
    }

    const theme = (await safeStorage.get('theme', DEFAULT_SETTINGS.theme)) as ThemeType;
    const floatingButtonEnabled = (await safeStorage.get(
      'floatingButtonEnabled',
      DEFAULT_SETTINGS.floatingButtonEnabled
    )) as boolean;

    return {
      aiConfig,
      theme,
      floatingButtonEnabled
    };
  },

  /**
   * Saves the AI configuration.
   */
  setAiConfig: async (config: AIConfig): Promise<void> => {
    await safeStorage.set('aiConfig', config);
  },

  /**
   * Retrieves the saved theme preference.
   */
  getTheme: async (): Promise<ThemeType> => {
    return (await safeStorage.get('theme', DEFAULT_SETTINGS.theme)) as ThemeType;
  },

  /**
   * Saves the theme preference.
   */
  setTheme: async (theme: ThemeType): Promise<void> => {
    await safeStorage.set('theme', theme);
  },

  /**
   * Retrieves whether the floating button is enabled.
   */
  getFloatingButtonEnabled: async (): Promise<boolean> => {
    return (await safeStorage.get(
      'floatingButtonEnabled',
      DEFAULT_SETTINGS.floatingButtonEnabled
    )) as boolean;
  },

  /**
   * Saves whether the floating button is enabled.
   */
  setFloatingButtonEnabled: async (enabled: boolean): Promise<void> => {
    await safeStorage.set('floatingButtonEnabled', enabled);
  },

  /**
   * Resets all settings to their default values.
   */
  clearAllSettings: async (): Promise<void> => {
    await safeStorage.set('aiConfig', DEFAULT_SETTINGS.aiConfig);
    await safeStorage.set('geminiApiKey', ''); // clear legacy key too
    await safeStorage.set('theme', DEFAULT_SETTINGS.theme);
    await safeStorage.set('floatingButtonEnabled', DEFAULT_SETTINGS.floatingButtonEnabled);
  }
};
