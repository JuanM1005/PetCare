import { clsx } from 'clsx';
import { FaPaw } from 'react-icons/fa6';
import { FiChevronRight, FiClock, FiUser } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Badge, Card } from '@/components/ui';

import { appointmentStatusBadgeVariants } from '../../appointments.constants';
import type { AppointmentStatus } from '../../appointments.types';
import type { AppointmentCardProps } from './AppointmentCard.types';

const statusCardClasses: Record<AppointmentStatus, string> = {
  scheduled: 'border-border-strong',
  confirmed: 'border-success/30 bg-success/10',
  in_progress: 'border-warning/30 bg-warning/10',
  completed: 'border-success/30 bg-success/10',
  cancelled: 'border-danger/30 bg-danger/10',
};

export const AppointmentCard = ({ item }: AppointmentCardProps) => {
  const { t } = useTranslation('appointments');
  const { appointment, patient, veterinarian } = item;

  return (
    <Link
      aria-label={t('card.viewDetails', {
        patient: patient.name,
        time: appointment.startTime,
      })}
      className="min-w-0 flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      to={`/appointments/${appointment.id}`}
    >
      <Card
        className={clsx(
          'min-w-0 border-hairline shadow-none',
          statusCardClasses[appointment.status],
        )}
        interactive
        padding="md"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-semibold text-text-primary">
              {patient.name}
              <FaPaw aria-hidden="true" className="size-3.5 text-text-muted" />
            </p>
            <p className="mt-1 text-sm text-text-secondary">{t(`types.${appointment.type}`)}</p>
          </div>
          <Badge variant={appointmentStatusBadgeVariants[appointment.status]}>
            {t(`statuses.${appointment.status}`)}
          </Badge>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <FiUser aria-hidden="true" className="size-3.5" />
              {veterinarian.name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiClock aria-hidden="true" className="size-3.5" />
              {t('card.duration', { count: appointment.durationMinutes })}
            </span>
          </div>
          <FiChevronRight aria-hidden="true" className="size-4 shrink-0 text-primary-600" />
        </div>
      </Card>
    </Link>
  );
};
