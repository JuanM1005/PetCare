import { clsx } from 'clsx';
import { useId, useState } from 'react';
import type { ChangeEvent } from 'react';

import {
  combineDescribedBy,
  fieldControlClassName,
  fieldErrorClassName,
  fieldHintClassName,
  fieldLabelClassName,
} from '../shared/formField';
import type { TextareaProps } from './Textarea.types';

const getTextLength = (value: TextareaProps['value'] | TextareaProps['defaultValue']) => {
  return value === undefined || value === null ? 0 : String(value).length;
};

export const Textarea = ({
  className,
  defaultValue,
  error,
  fullWidth = false,
  hint,
  id,
  label,
  maxLength,
  onChange,
  showCount = false,
  value,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? `textarea-${generatedId}`;
  const messageId = error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined;
  const countId = showCount && maxLength ? `${textareaId}-count` : undefined;
  const [uncontrolledCount, setUncontrolledCount] = useState(() => getTextLength(defaultValue));
  const characterCount = value === undefined ? uncontrolledCount : getTextLength(value);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setUncontrolledCount(event.currentTarget.value.length);
    }

    onChange?.(event);
  };

  return (
    <div className={clsx('flex max-w-full flex-col gap-1.5', fullWidth ? 'w-full' : 'w-80')}>
      {label ? (
        <label className={fieldLabelClassName} htmlFor={textareaId}>
          {label}
        </label>
      ) : null}
      <textarea
        className={clsx(
          fieldControlClassName,
          'min-h-24 resize-y',
          error && 'border-danger focus:border-danger',
          className,
        )}
        defaultValue={defaultValue}
        id={textareaId}
        maxLength={maxLength}
        onChange={handleChange}
        value={value}
        aria-describedby={combineDescribedBy(ariaDescribedBy, messageId, countId)}
        aria-invalid={error ? true : ariaInvalid}
        {...rest}
      />
      <div className="flex items-start justify-between gap-3">
        <span>
          {error ? (
            <span className={fieldErrorClassName} id={messageId}>
              {error}
            </span>
          ) : hint ? (
            <span className={fieldHintClassName} id={messageId}>
              {hint}
            </span>
          ) : null}
        </span>
        {showCount && maxLength ? (
          <span className="ml-auto shrink-0 text-xs text-text-muted" id={countId}>
            {characterCount} / {maxLength}
          </span>
        ) : null}
      </div>
    </div>
  );
};
