import type { ComponentPropsWithRef, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}
