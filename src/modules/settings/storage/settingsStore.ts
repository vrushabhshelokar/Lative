import { safeStorage } from '@/lib/chrome';
import { AppSettings, ThemeType } from '../types';

const DEFAULT_SETTINGS: AppSettings = {
  geminiApiKey: '',
  theme: 'system',
  floatingButtonEnabled: false
};

export const settingsStore = {
  /**
   * Retrieves all user settings preferences.
   */
  getSettings: async (): Promise<AppSettings> => {
    const geminiApiKey = (await safeStorage.get('geminiApiKey', DEFAULT_SETTINGS.geminiApiKey)) as string;
    const theme = (await safeStorage.get('theme', DEFAULT_SETTINGS.theme)) as ThemeType;
    const floatingButtonEnabled = (await safeStorage.get(
      'floatingButtonEnabled',
      DEFAULT_SETTINGS.floatingButtonEnabled
    )) as boolean;

    return {
      geminiApiKey,
      theme,
      floatingButtonEnabled
    };
  },

  /**
   * Retrieves the saved Gemini API key.
   */
  getApiKey: async (): Promise<string> => {
    return (await safeStorage.get('geminiApiKey', DEFAULT_SETTINGS.geminiApiKey)) as string;
  },

  /**
   * Saves the Gemini API key.
   */
  setApiKey: async (key: string): Promise<void> => {
    await safeStorage.set('geminiApiKey', key.trim());
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
    await safeStorage.set('geminiApiKey', DEFAULT_SETTINGS.geminiApiKey);
    await safeStorage.set('theme', DEFAULT_SETTINGS.theme);
    await safeStorage.set('floatingButtonEnabled', DEFAULT_SETTINGS.floatingButtonEnabled);
  }
};
