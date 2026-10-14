import { clsx } from 'clsx';
import { FiClock } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import type { TimeSlotPickerProps } from './TimeSlotPicker.types';

export const TimeSlotPicker = ({
  availableSlots,
  disabled = false,
  error,
  hasVeterinarian,
  onSelect,
  selectedTime,
  slots,
}: TimeSlotPickerProps) => {
  const { t } = useTranslation('appointments');
  const errorId = 'appointment-start-time-error';

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-sm font-medium text-text-primary">
        {t('register.fields.startTime.label')}
      </legend>

      {!hasVeterinarian ? (
        <div className="mt-3 flex gap-2 rounded-md bg-surface-subtle p-3 text-sm text-text-secondary">
          <FiClock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-text-muted" />
          <p>{t('register.availability.selectVeterinarian')}</p>
        </div>
      ) : availableSlots.length === 0 ? (
        <div className="mt-3 flex gap-2 rounded-md bg-surface-subtle p-3 text-sm text-text-secondary">
          <FiClock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-text-muted" />
          <p>{t('register.availability.noSlots')}</p>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {slots.map((slot) => {
            const isAvailable = availableSlots.includes(slot);
            const isSelected = selectedTime === slot;

            return (
              <button
                aria-label={t(
                  isAvailable
                    ? 'register.timeSlot.availableLabel'
                    : 'register.timeSlot.unavailableLabel',
                  { time: slot },
                )}
                aria-pressed={isAvailable ? isSelected : undefined}
                className={clsx(
                  'min-h-10 rounded-md border-hairline px-2 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                  isSelected
                    ? 'border-primary-600 bg-primary-action text-neutral-0'
                    : 'border-border-strong bg-surface text-text-secondary hover:border-primary-300 hover:bg-primary-500/5',
                  !isAvailable &&
                    'cursor-not-allowed border-border bg-surface-subtle text-text-muted line-through opacity-55 hover:border-border hover:bg-surface-subtle',
                )}
                disabled={disabled || !isAvailable}
                key={slot}
                onClick={() => onSelect(slot)}
                type="button"
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}

      {error ? (
        <p className="mt-2 text-xs font-medium text-danger" id={errorId}>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
};
