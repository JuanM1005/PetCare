import { useMemo } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Badge, Card, Select } from '@/components/ui';
import type { BadgeVariant, SelectOption } from '@/components/ui';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import type {
  MedicalHistoryPeriod,
  PatientAppointmentStatus,
  PatientAppointmentStatusFilter,
} from '../../patients.types';
import type { PatientAppointmentsHistoryProps } from './PatientAppointmentsHistory.types';

const statusValues: PatientAppointmentStatusFilter[] = [
  'all',
  'scheduled',
  'confirmed',
  'completed',
  'cancelled',
];
const periodValues: MedicalHistoryPeriod[] = ['3m', '6m', '12m', 'all'];
const statusVariants: Record<PatientAppointmentStatus, BadgeVariant> = {
  scheduled: 'neutral',
  confirmed: 'primary',
  completed: 'success',
  cancelled: 'danger',
};

export const PatientAppointmentsHistory = ({
  appointments,
  hasHistory,
  onPeriodChange,
  onStatusChange,
  period,
  status,
}: PatientAppointmentsHistoryProps) => {
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
  const statusOptions: SelectOption[] = statusValues.map((statusValue) => ({
    label: t(`appointments.filters.status.options.${statusValue}`),
    value: statusValue,
  }));
  const periodOptions: SelectOption[] = periodValues.map((periodValue) => ({
    label: t(`history.filters.period.options.${periodValue}`),
    value: periodValue,
  }));

  return (
    <section aria-labelledby="patient-appointment-history-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2
          className="text-lg font-semibold text-text-primary"
          id="patient-appointment-history-title"
        >
          {t('appointments.history.title')}
        </h2>

        <div className="flex w-full flex-wrap gap-3 sm:w-auto">
          <Select
            className="min-w-48"
            label={t('appointments.filters.status.label')}
            onChange={(event) =>
              onStatusChange(event.target.value as PatientAppointmentStatusFilter)
            }
            options={statusOptions}
            value={status}
          />
          <Select
            className="min-w-48"
            label={t('appointments.filters.period.label')}
            onChange={(event) => onPeriodChange(event.target.value as MedicalHistoryPeriod)}
            options={periodOptions}
            value={period}
          />
        </div>
      </div>

      <Card className="mt-3 overflow-hidden" padding="none">
        {appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-176 border-collapse text-left text-sm">
              <thead className="border-b border-border bg-surface-subtle text-xs font-semibold uppercase text-text-muted">
                <tr>
                  <th className="px-5 py-3" scope="col">
                    {t('appointments.columns.date')}
                  </th>
                  <th className="px-5 py-3" scope="col">
                    {t('appointments.columns.time')}
                  </th>
                  <th className="px-5 py-3" scope="col">
                    {t('appointments.columns.reason')}
                  </th>
                  <th className="px-5 py-3" scope="col">
                    {t('appointments.columns.veterinarian')}
                  </th>
                  <th className="px-5 py-3" scope="col">
                    {t('appointments.columns.status')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {appointments.map((appointment) => {
                  const appointmentDate = new Date(`${appointment.date}T${appointment.time}:00`);

                  return (
                    <tr className="transition-colors hover:bg-surface-subtle" key={appointment.id}>
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-text-primary">
                        {dateFormatter.format(appointmentDate)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                        {timeFormatter.format(appointmentDate)}
                      </td>
                      <td className="px-5 py-4 text-text-primary">
                        {t(`detail.appointment.reasons.${appointment.reason}`)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                        {appointment.veterinarian.name}
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={statusVariants[appointment.status]}>
                          {t(`appointments.status.${appointment.status}`)}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <FiCalendar aria-hidden="true" className="size-8 text-primary-600" />
            <h3 className="mt-3 text-sm font-semibold text-text-primary">
              {hasHistory
                ? t('appointments.history.filteredEmpty.title')
                : t('appointments.history.empty.title')}
            </h3>
            <p className="mt-1 max-w-md text-sm text-text-muted">
              {hasHistory
                ? t('appointments.history.filteredEmpty.description')
                : t('appointments.history.empty.description')}
            </p>
          </div>
        )}
      </Card>
    </section>
  );
};
