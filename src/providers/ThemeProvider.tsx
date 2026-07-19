/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSettings } from '@/modules/settings';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateTheme } = useSettings();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      let darkResolved = false;

      if (settings.theme === 'system') {
        darkResolved = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        darkResolved = settings.theme === 'dark';
      }

      setIsDark(darkResolved);
    };

    handleThemeChange();

    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => handleThemeChange();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [settings.theme]);

  const setTheme = async (newTheme: Theme) => {
    await updateTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: settings.theme as Theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
