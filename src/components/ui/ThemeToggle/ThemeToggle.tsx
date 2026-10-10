import { FiMoon, FiSun } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { useThemeContext } from '@/context/theme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { t } = useTranslation('common');
  const isDark = theme === 'dark';
  const label = t(isDark ? 'theme.light' : 'theme.dark');

  return (
    <button
      aria-label={label}
      aria-pressed={isDark}
      className="relative flex size-10 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
      onClick={toggleTheme}
      title={label}
      type="button"
    >
      {isDark ? (
        <FiSun aria-hidden="true" className="size-5" />
      ) : (
        <FiMoon aria-hidden="true" className="size-5" />
      )}
    </button>
  );
};
