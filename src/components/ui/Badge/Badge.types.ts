import type { ComponentPropsWithRef, ReactNode } from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'primary' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends ComponentPropsWithRef<'span'> {
  children: ReactNode;
  size?: BadgeSize;
  variant?: BadgeVariant;
  withPing?: boolean;
}
