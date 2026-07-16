/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { settingsStore, DEFAULT_AI_CONFIG } from '../storage/settingsStore';
import { AppSettings, ThemeType, AIConfig } from '../types';

export interface SettingsContextType {
  settings: AppSettings;
  isLoading: boolean;
  updateAiConfig: (config: Partial<AIConfig>) => Promise<void>;
  updateTheme: (theme: ThemeType) => Promise<void>;
  updateFloatingButtonEnabled: (enabled: boolean) => Promise<void>;
  clearSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>({
    aiConfig: DEFAULT_AI_CONFIG,
    theme: 'system',
    floatingButtonEnabled: false
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load saved preferences on initial mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await settingsStore.getSettings();
        setSettings(stored);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Theme class listener synchronizing dark mode preference reactively
  useEffect(() => {
    const handleThemeChange = () => {
      const root = document.documentElement;
      let darkResolved = false;

      if (settings.theme === 'system') {
        darkResolved = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        darkResolved = settings.theme === 'dark';
      }

      if (darkResolved) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    handleThemeChange();

    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => handleThemeChange();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [settings.theme]);

  const updateAiConfig = async (newConfig: Partial<AIConfig>) => {
    const updatedConfig = { ...settings.aiConfig, ...newConfig };
    await settingsStore.setAiConfig(updatedConfig);
    setSettings((prev) => ({ ...prev, aiConfig: updatedConfig }));
  };

  const updateTheme = async (newTheme: ThemeType) => {
    await settingsStore.setTheme(newTheme);
    setSettings((prev) => ({ ...prev, theme: newTheme }));
  };

  const updateFloatingButtonEnabled = async (enabled: boolean) => {
    await settingsStore.setFloatingButtonEnabled(enabled);
    setSettings((prev) => ({ ...prev, floatingButtonEnabled: enabled }));

    // Inform active tabs to mount or unmount the button immediately
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      try {
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            if (tab.id) {
              chrome.tabs.sendMessage(
                tab.id,
                { type: enabled ? 'FLOATING_SHOW' : 'FLOATING_HIDE' },
                () => {
                  // Suppress extension context errors on restricted domains
                  if (chrome.runtime.lastError) {
                    // Ignored
                  }
                }
              );
            }
          });
        });
      } catch (err) {
        console.warn('Failed to broadcast floating button visibility states:', err);
      }
    }
  };

  const clearSettings = async () => {
    await settingsStore.clearAllSettings();
    setSettings({
      aiConfig: DEFAULT_AI_CONFIG,
      theme: 'system',
      floatingButtonEnabled: false
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        updateAiConfig,
        updateTheme,
        updateFloatingButtonEnabled,
        clearSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
};
