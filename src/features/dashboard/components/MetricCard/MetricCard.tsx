import { clsx } from 'clsx';
import { FiCalendar, FiCheckCircle, FiCheckSquare, FiClock } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { Link } from 'react-router';

import { Card } from '@/components/ui';

import type { DashboardMetricIcon, DashboardSupportingTone } from '../../dashboard.types';
import type { MetricCardProps } from './MetricCard.types';

const metricIcons: Record<DashboardMetricIcon, IconType> = {
  availability: FiCheckSquare,
  calendar: FiCalendar,
  completed: FiCheckCircle,
  pending: FiClock,
};

const supportingToneClasses: Record<DashboardSupportingTone, string> = {
  success: 'text-success',
  warning: 'text-warning',
};

export const MetricCard = ({ metric }: MetricCardProps) => {
  const Icon = metricIcons[metric.icon];
  const isPrimary = metric.variant === 'primary';

  return (
    <Card
      className={clsx(
        'relative flex min-h-32 flex-col overflow-hidden',
        isPrimary && 'border-primary-600! bg-primary-600! text-neutral-0',
      )}
      padding="sm"
      variant={isPrimary ? 'outline' : 'default'}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={clsx('text-sm', isPrimary ? 'text-primary-100' : 'text-neutral-600')}>
            {metric.label}
          </p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <strong className="text-2xl font-semibold">{metric.value}</strong>
            {metric.unit ? <span className="text-xs font-medium">{metric.unit}</span> : null}
          </div>
        </div>
        <span
          aria-hidden="true"
          className={clsx(
            'flex size-10 shrink-0 items-center justify-center rounded-full border-4',
            isPrimary
              ? 'border-primary-400/50 text-primary-300'
              : 'border-primary-100 text-primary-200',
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>

      {metric.progress !== undefined ? (
        <div
          aria-label={`${metric.progress}% de citas atendidas`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={metric.progress}
          className="mt-auto h-1.5 overflow-hidden rounded-full bg-primary-100"
          role="progressbar"
        >
          <span
            className="block h-full rounded-full bg-success"
            style={{ width: `${metric.progress}%` }}
          />
        </div>
      ) : null}

      {metric.supportingText && metric.supportingTone ? (
        <p
          className={clsx(
            'mt-auto text-xs font-medium',
            supportingToneClasses[metric.supportingTone],
          )}
        >
          {metric.supportingText}
        </p>
      ) : null}

      {metric.actionLabel && metric.actionTo ? (
        <Link
          className="mt-auto w-fit text-xs font-semibold text-neutral-0 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-0 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
          to={metric.actionTo}
        >
          {metric.actionLabel}
        </Link>
      ) : null}
    </Card>
  );
};
