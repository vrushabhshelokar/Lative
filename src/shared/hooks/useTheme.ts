import { useThemeContext, Theme } from '@/providers/ThemeProvider';

export interface UseThemeResult {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  isDark: boolean;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme, isDark } = useThemeContext();
  return { theme, setTheme, isDark };
};
