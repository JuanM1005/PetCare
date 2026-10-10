import { clsx } from 'clsx';
import { useId } from 'react';

import { combineDescribedBy, fieldErrorClassName } from '../shared/formField';
import type { RadioProps } from './Radio.types';

export const Radio = ({
  className,
  disabled,
  error,
  id,
  label,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: RadioProps) => {
  const generatedId = useId();
  const radioId = id ?? `radio-${generatedId}`;
  const errorId = error ? `${radioId}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={clsx(
          'flex w-fit items-start gap-3 text-sm text-neutral-900',
          disabled && 'cursor-not-allowed text-neutral-500',
        )}
        htmlFor={radioId}
      >
        <span className="relative mt-0.5 flex size-4 shrink-0">
          <input
            className={clsx(
              'peer size-4 appearance-none rounded-full border-hairline border-neutral-300 bg-neutral-0 transition-colors checked:border-strong checked:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-danger',
              className,
            )}
            disabled={disabled}
            id={radioId}
            type="radio"
            aria-describedby={combineDescribedBy(ariaDescribedBy, errorId)}
            aria-invalid={error ? true : ariaInvalid}
            {...rest}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-primary-500 transition-transform peer-checked:scale-100"
          />
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
