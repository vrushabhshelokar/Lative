/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { safeStorage } from '@/lib/chrome';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await safeStorage.get('theme', 'system');
      setThemeState(storedTheme as Theme);
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      const root = document.documentElement;
      let darkResolved = false;

      if (theme === 'system') {
        darkResolved = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        darkResolved = theme === 'dark';
      }

      setIsDark(darkResolved);

      if (darkResolved) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    handleThemeChange();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => handleThemeChange();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await safeStorage.set('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
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
