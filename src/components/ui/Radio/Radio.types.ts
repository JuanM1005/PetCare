import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface RadioProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  error?: string;
  label: ReactNode;
}
