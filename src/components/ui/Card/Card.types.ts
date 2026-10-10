import type { ComponentPropsWithRef, ReactNode } from 'react';

export type CardVariant = 'default' | 'outline' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
  interactive?: boolean;
  padding?: CardPadding;
  variant?: CardVariant;
}
