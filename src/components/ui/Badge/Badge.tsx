import { clsx } from 'clsx';

import type { BadgeProps, BadgeSize, BadgeVariant } from './Badge.types';

const variantClasses: Record<BadgeVariant, string> = {
  success: 'border-success/30 bg-success/10 text-success',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  danger: 'border-danger/30 bg-danger/10 text-danger',
  primary: 'border-primary-300 bg-primary-50 text-primary-700',
  neutral: 'border-neutral-300 bg-neutral-100 text-neutral-600',
};

const dotClasses: Record<BadgeVariant, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  primary: 'bg-primary-500',
  neutral: 'bg-neutral-500',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'gap-1 px-2 py-0.5 text-xs',
  md: 'gap-1.5 px-3 py-1 text-sm',
};

export const Badge = ({
  children,
  className,
  size = 'sm',
  variant = 'neutral',
  withPing = false,
  ...rest
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex w-fit items-center rounded-full border-hairline font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {withPing ? (
        <span aria-hidden="true" className="relative flex size-2">
          <span
            className={clsx(
              'absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:animate-none',
              dotClasses[variant],
            )}
          />
          <span className={clsx('relative inline-flex size-2 rounded-full', dotClasses[variant])} />
        </span>
      ) : null}
      {children}
    </span>
  );
};
