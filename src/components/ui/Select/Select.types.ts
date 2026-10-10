import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<ComponentPropsWithRef<'select'>, 'children'> {
  error?: string;
  fullWidth?: boolean;
  hint?: string;
  label?: ReactNode;
  options: readonly SelectOption[];
  placeholder?: string;
}
