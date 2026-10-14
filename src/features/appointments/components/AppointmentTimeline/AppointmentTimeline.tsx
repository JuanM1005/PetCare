import { clsx } from 'clsx';
import { FiCalendar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui';

import type { AppointmentStatus } from '../../appointments.types';
import { AppointmentCard } from '../AppointmentCard';
import type { AppointmentTimelineProps } from './AppointmentTimeline.types';

const markerClasses: Record<AppointmentStatus, string> = {
  scheduled: 'bg-text-muted',
  confirmed: 'bg-success',
  in_progress: 'bg-warning',
  completed: 'bg-success',
  cancelled: 'bg-danger',
};

export const AppointmentTimeline = ({
  hasAppointmentsForDate,
  items,
  onClearFilters,
}: AppointmentTimelineProps) => {
  const { t } = useTranslation('appointments');

  if (items.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center px-6 py-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
          <FiCalendar aria-hidden="true" className="size-6" />
        </span>
        <h3 className="mt-4 font-semibold text-text-primary">
          {t(hasAppointmentsForDate ? 'empty.filters.title' : 'empty.date.title')}
        </h3>
        <p className="mt-1 max-w-md text-sm text-text-muted">
          {t(hasAppointmentsForDate ? 'empty.filters.description' : 'empty.date.description')}
        </p>
        {hasAppointmentsForDate ? (
          <Button className="mt-4" onClick={onClearFilters} size="sm" variant="ghost">
            {t('filters.clear')}
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <ol aria-label={t('timeline.label')} className="space-y-4">
      {items.map((item, index) => (
        <li
          className="grid min-w-0 grid-cols-[3.75rem_1rem_minmax(0,1fr)] gap-3"
          key={item.appointment.id}
        >
          <time
            className="pt-4 text-right text-sm font-semibold text-text-secondary"
            dateTime={`${item.appointment.date}T${item.appointment.startTime}`}
          >
            {item.appointment.startTime}
          </time>
          <span className="relative flex justify-center pt-5" aria-hidden="true">
            {index < items.length - 1 ? (
              <span className="absolute bottom-[-1.5rem] top-7 w-px bg-border-strong" />
            ) : null}
            <span
              className={clsx(
                'relative z-10 size-2.5 rounded-full ring-4 ring-surface',
                markerClasses[item.appointment.status],
              )}
            />
          </span>
          <AppointmentCard item={item} />
        </li>
      ))}
    </ol>
  );
};
