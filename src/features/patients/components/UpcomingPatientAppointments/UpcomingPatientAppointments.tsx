import { useMemo } from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Badge, Card } from '@/components/ui';
import type { BadgeVariant } from '@/components/ui';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import type { PatientAppointmentStatus } from '../../patients.types';
import type { UpcomingPatientAppointmentsProps } from './UpcomingPatientAppointments.types';

const statusVariants: Record<PatientAppointmentStatus, BadgeVariant> = {
  scheduled: 'neutral',
  confirmed: 'primary',
  completed: 'success',
  cancelled: 'danger',
};

export const UpcomingPatientAppointments = ({ appointments }: UpcomingPatientAppointmentsProps) => {
  const { i18n, t } = useTranslation('patients');
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(languageLocales[language], {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    [language],
  );
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(languageLocales[language], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [language],
  );

  return (
    <section aria-labelledby="upcoming-patient-appointments-title">
      <h2
        className="text-lg font-semibold text-text-primary"
        id="upcoming-patient-appointments-title"
      >
        {t('appointments.upcoming.title')}
      </h2>

      {appointments.length > 0 ? (
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {appointments.map((appointment) => {
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}:00`);

            return (
              <Card className="flex flex-col gap-4" key={appointment.id} padding="md">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600">
                      <FiCalendar aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {dateFormatter.format(appointmentDate)}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
                        <FiClock aria-hidden="true" className="size-3.5" />
                        {timeFormatter.format(appointmentDate)}
                      </p>
                    </div>
                  </div>
                  <Badge variant={statusVariants[appointment.status]}>
                    {t(`appointments.status.${appointment.status}`)}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {t(`detail.appointment.reasons.${appointment.reason}`)}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-text-secondary">
                    <FiUser aria-hidden="true" className="size-3.5" />
                    {appointment.veterinarian.name}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card
          className="mt-3 flex flex-col items-center justify-center py-8 text-center"
          padding="lg"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
            <FiCalendar aria-hidden="true" className="size-6" />
          </span>
          <h3 className="mt-4 text-sm font-semibold text-text-primary">
            {t('appointments.upcoming.empty.title')}
          </h3>
          <p className="mt-1 max-w-md text-sm text-text-muted">
            {t('appointments.upcoming.empty.description')}
          </p>
        </Card>
      )}
    </section>
  );
};
