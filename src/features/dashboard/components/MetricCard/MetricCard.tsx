import { clsx } from 'clsx';
import { FiCalendar, FiCheckCircle, FiCheckSquare, FiClock } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Card } from '@/components/ui';

import type { DashboardMetricIcon, DashboardMetricId } from '../../dashboard.types';
import type { MetricCardProps } from './MetricCard.types';

const metricIcons: Record<DashboardMetricIcon, IconType> = {
  availability: FiCheckSquare,
  calendar: FiCalendar,
  completed: FiCheckCircle,
  pending: FiClock,
};

interface MetricPresentation {
  actionKey?: string;
  labelKey: string;
  supportingKey?: string;
  supportingTone?: 'success' | 'warning';
  unitKey?: string;
}

const metricPresentation: Record<DashboardMetricId, MetricPresentation> = {
  availability: {
    actionKey: 'metrics.calendar',
    labelKey: 'metrics.availability',
    unitKey: 'metrics.spaces',
  },
  'completed-appointments': { labelKey: 'metrics.completed' },
  'pending-appointments': {
    labelKey: 'metrics.pending',
    supportingKey: 'metrics.pendingSupport',
    supportingTone: 'warning',
  },
  'today-appointments': {
    labelKey: 'metrics.today',
    supportingKey: 'metrics.todaySupport',
    supportingTone: 'success',
  },
};

export const MetricCard = ({ metric }: MetricCardProps) => {
  const { t } = useTranslation('dashboard');
  const Icon = metricIcons[metric.icon];
  const presentation = metricPresentation[metric.id];
  const isPrimary = metric.id === 'availability';

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
          <p className={clsx('text-sm', isPrimary ? 'text-primary-100' : 'text-text-secondary')}>
            {t(presentation.labelKey)}
          </p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <strong className="text-2xl font-semibold">{metric.value}</strong>
            {presentation.unitKey ? (
              <span className="text-xs font-medium">{t(presentation.unitKey)}</span>
            ) : null}
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
          aria-label={t('metrics.completedProgress', { progress: metric.progress })}
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

      {presentation.supportingKey && presentation.supportingTone ? (
        <p
          className={clsx(
            'mt-auto text-xs font-medium',
            presentation.supportingTone === 'success' ? 'text-success' : 'text-warning',
          )}
        >
          {t(presentation.supportingKey)}
        </p>
      ) : null}

      {presentation.actionKey && metric.actionTo ? (
        <Link
          className="mt-auto w-fit text-xs font-semibold text-neutral-0 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-0 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
          to={metric.actionTo}
        >
          {t(presentation.actionKey)}
        </Link>
      ) : null}
    </Card>
  );
};
