import { createContext } from 'react';

import type { Accent } from '@/lib/accent';

export interface AccentContextValue {
  accent: Accent;
  setAccent: (accent: Accent) => void;
}

export const AccentContext = createContext<AccentContextValue | undefined>(undefined);
