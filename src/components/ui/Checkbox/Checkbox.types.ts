import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  error?: string;
  label: ReactNode;
}
