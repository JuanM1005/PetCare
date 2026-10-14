import { clsx } from 'clsx';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/ui';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import { getCalendarMonthDays, getDateValue, getLocalDate } from '../../appointments.utils';
import type { AppointmentCalendarProps } from './AppointmentCalendar.types';

const weekdayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const AppointmentCalendar = ({
  datesWithAppointments,
  onDateSelect,
  selectedDate,
}: AppointmentCalendarProps) => {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const initialDate = getLocalDate(selectedDate);

    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1, 12);
  });
  const { i18n, t } = useTranslation('appointments');
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const locale = languageLocales[language];
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(visibleMonth);
  const dateLabelFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const calendarDays = getCalendarMonthDays(visibleMonth);
  const today = getDateValue(new Date());

  const changeMonth = (offset: number) => {
    setVisibleMonth(
      (currentMonth) =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1, 12),
    );
  };

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-text-primary first-letter:uppercase">{monthLabel}</h2>
        <div className="flex items-center gap-1">
          <button
            aria-label={t('calendar.previousMonth')}
            className="flex size-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            onClick={() => changeMonth(-1)}
            type="button"
          >
            <FiChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            aria-label={t('calendar.nextMonth')}
            className="flex size-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            onClick={() => changeMonth(1)}
            type="button"
          >
            <FiChevronRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {weekdayKeys.map((weekday) => (
          <span className="py-1 text-xs font-semibold text-text-muted" key={weekday}>
            {t(`calendar.weekdays.${weekday}`)}
          </span>
        ))}
        {calendarDays.map((day, index) => {
          if (!day) {
            return <span aria-hidden="true" key={`empty-${index}`} />;
          }

          const isSelected = day.value === selectedDate;
          const isToday = day.value === today;
          const hasAppointments = datesWithAppointments.includes(day.value);
          const accessibleLabel = `${t('calendar.selectDate', {
            date: dateLabelFormatter.format(day.date),
          })}${hasAppointments ? `. ${t('calendar.hasAppointments')}` : ''}`;

          return (
            <button
              aria-current={isToday ? 'date' : undefined}
              aria-label={accessibleLabel}
              aria-pressed={isSelected}
              className={clsx(
                'relative flex aspect-square min-h-8 items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
                isSelected
                  ? 'bg-primary-action text-neutral-0'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                isToday && !isSelected && 'ring-1 ring-primary-500 text-primary-700',
              )}
              key={day.value}
              onClick={() => onDateSelect(day.value)}
              type="button"
            >
              {day.date.getDate()}
              {hasAppointments ? (
                <span
                  aria-hidden="true"
                  className={clsx(
                    'absolute bottom-1 size-1 rounded-full',
                    isSelected ? 'bg-neutral-0' : 'bg-primary-500',
                  )}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </Card>
  );
};
