import commonEn from './locales/en/common.json';
import dashboardEn from './locales/en/dashboard.json';
import layoutEn from './locales/en/layout.json';
import patientsEn from './locales/en/patients.json';
import settingsEn from './locales/en/settings.json';
import commonEs from './locales/es/common.json';
import dashboardEs from './locales/es/dashboard.json';
import layoutEs from './locales/es/layout.json';
import patientsEs from './locales/es/patients.json';
import settingsEs from './locales/es/settings.json';

export const SUPPORTED_LANGUAGES = ['es', 'en'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'es';
export const LANGUAGE_STORAGE_KEY = 'petcare-language';
export const defaultNS = 'common';

export const resources = {
  en: {
    common: commonEn,
    dashboard: dashboardEn,
    layout: layoutEn,
    patients: patientsEn,
    settings: settingsEn,
  },
  es: {
    common: commonEs,
    dashboard: dashboardEs,
    layout: layoutEs,
    patients: patientsEs,
    settings: settingsEs,
  },
} as const;

export const getSupportedLanguage = (language?: string): SupportedLanguage => {
  return language?.startsWith('en') ? 'en' : 'es';
};

export const languageLocales: Record<SupportedLanguage, string> = {
  en: 'en-US',
  es: 'es-MX',
};
