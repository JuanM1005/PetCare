import { useContext } from 'react';

import { AccentContext } from './AccentContext';

export const useAccentContext = () => {
  const context = useContext(AccentContext);

  if (!context) {
    throw new Error('useAccentContext must be used within AccentProvider.');
  }

  return context;
};
