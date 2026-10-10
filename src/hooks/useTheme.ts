import { useLayoutEffect, useState } from 'react';

import type { ThemeContextValue } from '@/context/theme/ThemeContext';
import { applyTheme, getInitialTheme } from '@/lib/theme';

export const useTheme = (): ThemeContextValue => {
  const [theme, setTheme] = useState(getInitialTheme);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};
