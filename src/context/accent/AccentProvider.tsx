import { useLayoutEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { applyAccent, getInitialAccent } from '@/lib/accent';

import { AccentContext } from './AccentContext';

interface AccentProviderProps {
  children: ReactNode;
}

/**
 * Gestiona el color de acento global de PetCare.
 *
 * La selección se persiste localmente y se aplica como `data-accent` sobre
 * el elemento raíz para mantener la lógica de apariencia fuera de los componentes.
 */
export const AccentProvider = ({ children }: AccentProviderProps) => {
  const [accent, setAccent] = useState(getInitialAccent);

  useLayoutEffect(() => {
    applyAccent(accent);
  }, [accent]);

  return <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>;
};
