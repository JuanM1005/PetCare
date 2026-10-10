import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

const clockUpdateInterval = 60_000;

export const DashboardDateTime = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const { i18n } = useTranslation();
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const locale = languageLocales[language];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentDate(new Date());
    }, clockUpdateInterval);

    return () => window.clearInterval(intervalId);
  }, []);

  const time = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(currentDate);
  const date = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  }).format(currentDate);

  return (
    <time className="text-right" dateTime={currentDate.toISOString()}>
      <span className="block text-lg font-semibold text-text-primary">{time}</span>
      <span className="mt-1 block text-sm text-text-secondary first-letter:uppercase">{date}</span>
    </time>
  );
};
