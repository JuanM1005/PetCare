import { clsx } from 'clsx';
import { useId } from 'react';

import {
  combineDescribedBy,
  fieldControlClassName,
  fieldErrorClassName,
  fieldHintClassName,
  fieldLabelClassName,
} from '../shared/formField';
import type { SelectProps } from './Select.types';

export const Select = ({
  className,
  defaultValue,
  error,
  fullWidth = false,
  hint,
  id,
  label,
  options,
  placeholder,
  value,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id ?? `select-${generatedId}`;
  const messageId = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined;

  return (
    <div className={clsx('flex max-w-full flex-col gap-1.5', fullWidth ? 'w-full' : 'w-fit')}>
      {label ? (
        <label className={fieldLabelClassName} htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      <select
        className={clsx(
          fieldControlClassName,
          'min-w-48',
          error && 'border-danger focus:border-danger',
          className,
        )}
        defaultValue={defaultValue ?? (placeholder && value === undefined ? '' : undefined)}
        id={selectId}
        value={value}
        aria-describedby={combineDescribedBy(ariaDescribedBy, messageId)}
        aria-invalid={error ? true : ariaInvalid}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
