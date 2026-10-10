import type { ReactNode } from 'react';

import { useTheme } from '@/hooks/useTheme';

import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeValue = useTheme();

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
};
