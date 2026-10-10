import { clsx } from 'clsx';

import type { SpinnerProps, SpinnerSize, SpinnerVariant } from './Spinner.types';

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-10 border-3',
};

const variantClasses: Record<SpinnerVariant, string> = {
  primary: 'text-primary-500',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  neutral: 'text-neutral-500',
};

export const Spinner = ({
  className,
  label,
  size = 'md',
  variant = 'primary',
  ref,
  role,
  'aria-hidden': ariaHidden,
  'aria-label': ariaLabel,
  ...rest
}: SpinnerProps) => {
  const isHidden = ariaHidden === true || ariaHidden === 'true';

  return (
    <span
      ref={ref}
      className={clsx('inline-flex items-center gap-2', variantClasses[variant], className)}
      role={isHidden ? undefined : (role ?? 'status')}
      aria-hidden={ariaHidden}
      aria-label={isHidden || label ? ariaLabel : (ariaLabel ?? 'Cargando')}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={clsx(
          'inline-block shrink-0 animate-spin rounded-full border-current border-r-transparent motion-reduce:animate-none',
          sizeClasses[size],
        )}
      />
      {label ? <span className="text-sm text-neutral-600">{label}</span> : null}
    </span>
  );
};
