import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  error?: string;
  fullWidth?: boolean;
  hint?: string;
  label?: ReactNode;
  showCount?: boolean;
}
