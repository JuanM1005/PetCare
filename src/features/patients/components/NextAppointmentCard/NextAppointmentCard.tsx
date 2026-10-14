import { clsx } from 'clsx';
import { useMemo } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Button, Card } from '@/components/ui';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import type { NextAppointmentCardProps } from './NextAppointmentCard.types';

export const NextAppointmentCard = ({ appointment, className }: NextAppointmentCardProps) => {
  const { i18n, t } = useTranslation('patients');
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(languageLocales[language], {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    [language],
  );

  return (
    <Card className={clsx('flex flex-col', className)} padding="md">
      <div className="flex items-center gap-2">
        <FiCalendar aria-hidden="true" className="size-5 text-primary-600" />
        <h3 className="font-semibold text-text-primary">{t('detail.sections.nextAppointment')}</h3>
      </div>

      {appointment ? (
        <div className="mt-4 flex flex-1 flex-col rounded-md border-hairline border-border bg-surface-subtle p-4">
          <p className="text-sm font-semibold text-text-primary">
            {dateFormatter.format(new Date(`${appointment.date}T00:00:00`))}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {t(`detail.appointment.reasons.${appointment.reason}`)}
          </p>
        </div>
      ) : (
        <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-md border-hairline border-border bg-surface-subtle p-5 text-center">
          <FiCalendar aria-hidden="true" className="size-8 text-primary-600" />
          <p className="mt-3 text-sm font-semibold text-text-primary">
            {t('detail.appointment.emptyTitle')}
          </p>
          <p className="mt-1 text-xs text-text-muted">{t('detail.appointment.emptyDescription')}</p>
        </div>
      )}

      <Button
        className="mt-3"
        disabled
        fullWidth
        size="sm"
        title={t('actions.availableSoon')}
        variant="secondary"
      >
        {t('detail.actions.scheduleNow')}
      </Button>
    </Card>
  );
};
