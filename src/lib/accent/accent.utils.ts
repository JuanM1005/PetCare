import { ACCENTS, ACCENT_STORAGE_KEY, DEFAULT_ACCENT } from './accent.constants';
import type { Accent } from './accent.constants';

/**
 * Comprueba que un valor recuperado del almacenamiento corresponda a uno
 * de los accents soportados antes de utilizarlo.
 */
export const isAccent = (value: unknown): value is Accent =>
  typeof value === 'string' && ACCENTS.some((accent) => accent === value);

export const getInitialAccent = (): Accent => {
  if (typeof window === 'undefined') {
    return DEFAULT_ACCENT;
  }

  const storedAccent = window.localStorage.getItem(ACCENT_STORAGE_KEY);

  return isAccent(storedAccent) ? storedAccent : DEFAULT_ACCENT;
};

export const applyAccent = (accent: Accent) => {
  document.documentElement.dataset.accent = accent;
  window.localStorage.setItem(ACCENT_STORAGE_KEY, accent);
};
