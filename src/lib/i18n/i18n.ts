import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  defaultNS,
  getSupportedLanguage,
  resources,
} from './i18n.constants';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS,
    detection: {
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      order: ['localStorage', 'navigator', 'htmlTag'],
    },
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: { escapeValue: false },
    load: 'languageOnly',
    resources,
    supportedLngs: SUPPORTED_LANGUAGES,
  });

const updateDocumentLanguage = (language: string) => {
  document.documentElement.lang = getSupportedLanguage(language);
};

updateDocumentLanguage(i18n.resolvedLanguage ?? DEFAULT_LANGUAGE);
i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;
