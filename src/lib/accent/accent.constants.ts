export const ACCENTS = ['blue', 'teal', 'indigo', 'violet'] as const;

export type Accent = (typeof ACCENTS)[number];

export const DEFAULT_ACCENT: Accent = 'blue';
export const ACCENT_STORAGE_KEY = 'petcare-accent';
