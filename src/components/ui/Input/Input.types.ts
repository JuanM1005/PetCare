import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  error?: string;
  fullWidth?: boolean;
  hint?: string;
  label?: ReactNode;
}
