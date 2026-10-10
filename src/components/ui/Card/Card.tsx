import { clsx } from 'clsx';

import type { CardPadding, CardProps, CardVariant } from './Card.types';

const variantClasses: Record<CardVariant, string> = {
  default: 'border-hairline border-neutral-200 bg-neutral-0 shadow-sm',
  outline: 'border-hairline border-neutral-300 bg-neutral-0',
  ghost: 'border-width-none bg-transparent',
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export const Card = ({
  children,
  className,
  interactive = false,
  padding = 'md',
  variant = 'default',
  ...rest
}: CardProps) => {
  return (
    <div
      className={clsx(
        'rounded-lg',
        variantClasses[variant],
        paddingClasses[padding],
        interactive && 'transition-colors hover:border-primary-300 hover:bg-primary-50/30',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
