import { clsx } from 'clsx';
import { useId } from 'react';

import { combineDescribedBy, fieldErrorClassName } from '../shared/formField';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = ({
  className,
  disabled,
  error,
  id,
  label,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: CheckboxProps) => {
  const generatedId = useId();
  const checkboxId = id ?? `checkbox-${generatedId}`;
  const errorId = error ? `${checkboxId}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={clsx(
          'flex w-fit items-start gap-3 text-sm text-text-primary',
          disabled && 'cursor-not-allowed text-text-muted',
        )}
        htmlFor={checkboxId}
      >
        <span className="relative mt-0.5 flex size-4 shrink-0">
          <input
            className={clsx(
              'peer size-4 appearance-none rounded-sm border-hairline border-border-strong bg-surface transition-colors checked:border-primary-500 checked:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-danger',
              className,
            )}
            disabled={disabled}
            id={checkboxId}
            type="checkbox"
            aria-describedby={combineDescribedBy(ariaDescribedBy, errorId)}
            aria-invalid={error ? true : ariaInvalid}
            {...rest}
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-4 scale-75 text-neutral-0 opacity-0 transition-opacity peer-checked:opacity-100"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="m4 8 2.5 2.5L12 5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
        <span>{label}</span>
      </label>
      {error ? (
        <span className={fieldErrorClassName} id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
};
