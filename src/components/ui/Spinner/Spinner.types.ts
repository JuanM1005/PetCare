import type { ComponentPropsWithRef } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface SpinnerProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  label?: string;
  size?: SpinnerSize;
  variant?: SpinnerVariant;
}
