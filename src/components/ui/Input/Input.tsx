import { clsx } from 'clsx';
import { useId } from 'react';

import {
  combineDescribedBy,
  fieldControlClassName,
  fieldErrorClassName,
  fieldHintClassName,
  fieldLabelClassName,
} from '../shared/formField';
import type { InputProps } from './Input.types';

export const Input = ({
  className,
  error,
  fullWidth = false,
  hint,
  id,
  label,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;
  const messageId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={clsx('flex max-w-full flex-col gap-1.5', fullWidth ? 'w-full' : 'w-fit')}>
      {label ? (
        <label className={fieldLabelClassName} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        className={clsx(
          fieldControlClassName,
          error && 'border-danger focus:border-danger',
          className,
        )}
        id={inputId}
        aria-describedby={combineDescribedBy(ariaDescribedBy, messageId)}
        aria-invalid={error ? true : ariaInvalid}
        {...rest}
      />
      {error ? (
        <span className={fieldErrorClassName} id={messageId}>
          {error}
        </span>
      ) : hint ? (
        <span className={fieldHintClassName} id={messageId}>
          {hint}
        </span>
      ) : null}
    </div>
  );
};
