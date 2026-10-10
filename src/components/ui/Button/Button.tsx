import { clsx } from 'clsx';

import { Spinner } from '../Spinner';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-neutral-0 hover:bg-primary-600',
  secondary: 'border-hairline border-neutral-300 bg-neutral-0 text-neutral-900 hover:bg-neutral-50',
  danger: 'bg-danger text-neutral-0 hover:opacity-90',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-8 px-3 py-1.5 text-xs',
  md: 'min-h-9 px-4 py-2 text-sm',
  lg: 'min-h-10 px-5 py-2.5 text-base',
};

const spinnerVariantClasses: Record<ButtonVariant, string> = {
  primary: 'text-neutral-0!',
  secondary: 'text-primary-500!',
  danger: 'text-neutral-0!',
  ghost: 'text-primary-500!',
};

export const Button = ({
  children,
  className,
  disabled,
  fullWidth = false,
  isLoading = false,
  loadingText,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading ? (
        <Spinner
          aria-hidden="true"
          className={spinnerVariantClasses[variant]}
          size="sm"
          variant="neutral"
        />
      ) : null}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
};
