import { FiCalendar, FiClock } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/ui';

import type { AvailabilityCardProps } from './AvailabilityCard.types';

export const AvailabilityCard = ({ slots }: AvailabilityCardProps) => {
  const { t } = useTranslation('appointments');
  const [nextSlot, ...laterSlots] = slots;

  return (
    <Card padding="lg">
      <div className="flex items-center gap-2">
        <FiCalendar aria-hidden="true" className="size-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-text-primary">{t('availability.title')}</h2>
      </div>

      <div className="mt-5 rounded-lg bg-success/10 px-4 py-5 text-center">
        <strong className="block text-3xl font-semibold text-success">{slots.length}</strong>
        <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-text-secondary">
          {t('availability.freeSlots')}
        </span>
      </div>

      {nextSlot ? (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-md border-hairline border-border bg-surface-subtle px-3 py-3">
            <span className="text-sm font-semibold text-text-primary">
              {t('availability.nextAvailable')}
            </span>
            <span className="rounded-md bg-primary-50 px-2 py-1 text-sm font-semibold text-primary-700">
              {nextSlot}
            </span>
          </div>
          {laterSlots.slice(0, 2).map((slot) => (
            <div
              className="flex items-center justify-between gap-3 rounded-md border-hairline border-border px-3 py-3"
              key={slot}
            >
              <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
                <FiClock aria-hidden="true" className="size-4" />
                {t('availability.later')}
              </span>
              <span className="text-sm font-medium text-text-primary">{slot}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-md bg-surface-subtle px-4 py-4 text-center text-sm text-text-muted">
          {t('availability.none')}
        </p>
      )}
    </Card>
  );
};
