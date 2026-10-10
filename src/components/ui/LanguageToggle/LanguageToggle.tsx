import { useTranslation } from 'react-i18next';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getSupportedLanguage } from '@/lib/i18n';

export const LanguageToggle = () => {
  const { i18n, t } = useTranslation('common');
  const currentLanguage = getSupportedLanguage(i18n.resolvedLanguage ?? DEFAULT_LANGUAGE);

  const handleLanguageChange = () => {
    const currentIndex = SUPPORTED_LANGUAGES.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;

    void i18n.changeLanguage(SUPPORTED_LANGUAGES[nextIndex]);
  };

  return (
    <button
      aria-label={t('language.change')}
      className="flex min-h-8 shrink-0 items-center justify-center rounded-md border-hairline border-border bg-surface px-2 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
      onClick={handleLanguageChange}
      title={t('language.change')}
      type="button"
    >
      {currentLanguage.toUpperCase()}
    </button>
  );
};
