import { clsx } from 'clsx';
import { FiFilter, FiList } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Badge, Card } from '@/components/ui';
import type { BadgeVariant } from '@/components/ui';

import type { AppointmentStatus, DashboardAvatarTone } from '../../dashboard.types';
import type { UpcomingAppointmentsProps } from './UpcomingAppointments.types';

const statusVariants: Record<AppointmentStatus, BadgeVariant> = {
  confirmed: 'primary',
  pending: 'warning',
  scheduled: 'neutral',
};

const avatarClasses: Record<DashboardAvatarTone, string> = {
  neutral: 'bg-primary-100 text-primary-700',
  primary: 'bg-primary-600 text-neutral-0',
  warning: 'bg-warning text-neutral-0',
};

export const UpcomingAppointments = ({ appointments }: UpcomingAppointmentsProps) => {
  const { t } = useTranslation('dashboard');

  return (
    <Card className="h-full overflow-hidden" padding="none">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-text-primary">
          <FiList aria-hidden="true" className="size-5 text-primary-600" />
          {t('appointments.title')}
        </h2>
        <button
          aria-label={t('appointments.filter')}
          className="flex size-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          type="button"
        >
          <FiFilter aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-collapse text-left text-sm">
          <thead className="bg-surface-subtle text-xs font-medium text-text-secondary">
            <tr>
              <th className="px-4 py-3" scope="col">
                {t('appointments.columns.time')}
              </th>
              <th className="px-4 py-3" scope="col">
                {t('appointments.columns.patient')}
              </th>
              <th className="px-4 py-3" scope="col">
                {t('appointments.columns.type')}
              </th>
              <th className="px-4 py-3" scope="col">
                {t('appointments.columns.reason')}
              </th>
              <th className="px-4 py-3" scope="col">
                {t('appointments.columns.status')}
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const statusVariant = statusVariants[appointment.status];

              return (
                <tr
                  className={clsx(
                    'border-t border-border',
                    appointment.status === 'confirmed' && 'bg-primary-500/10',
                  )}
                  key={appointment.id}
                >
                  <th
                    className={clsx(
                      'whitespace-nowrap px-4 py-3 font-semibold',
                      appointment.status === 'pending' ? 'text-warning' : 'text-text-primary',
                    )}
                    scope="row"
                  >
                    {appointment.time}
                  </th>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                          avatarClasses[appointment.avatarTone],
                        )}
                      >
                        {appointment.initials}
                      </span>
                      <span className="font-semibold text-text-primary">
                        {appointment.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      {appointment.species === 'dog' ? (
                        <FaPaw aria-hidden="true" className="size-3.5" />
                      ) : null}
                      {t(`species.${appointment.species}`)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-primary">
                    {t(`appointments.reasons.${appointment.reason}`)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant}>
                      {t(`appointments.statuses.${appointment.status}`)}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-4 py-3 text-center">
        <Link
          className="text-sm font-semibold text-primary-700 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          to="/appointments"
        >
          {t('appointments.viewAll')}
        </Link>
      </div>
    </Card>
  );
};
