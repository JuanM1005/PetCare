import { clsx } from 'clsx';
import { FiChevronRight, FiClock } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/ui';

import type { DashboardAvatarTone } from '../../dashboard.types';
import type { RecentPatientsProps } from './RecentPatients.types';

const avatarClasses: Record<DashboardAvatarTone, string> = {
  neutral: 'bg-primary-100 text-primary-700',
  primary: 'bg-primary-600 text-neutral-0',
  warning: 'bg-warning text-neutral-0',
};

export const RecentPatients = ({ patients }: RecentPatientsProps) => {
  const { t } = useTranslation('dashboard');

  return (
    <Card className="flex-1 overflow-hidden" padding="none">
      <div className="border-b border-border px-4 py-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-text-primary">
          <FiClock aria-hidden="true" className="size-5 text-primary-600" />
          {t('recentPatients')}
        </h2>
      </div>
      <ul>
        {patients.map((patient) => (
          <li className="border-b border-border last:border-b-0" key={patient.id}>
            <button
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
              type="button"
            >
              <span
                className={clsx(
                  'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                  avatarClasses[patient.avatarTone],
                )}
              >
                {patient.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-text-primary">
                  {patient.name}
                </span>
                <span className="block truncate text-xs text-text-secondary">
                  {t(`species.${patient.species}`)} · {t(`breeds.${patient.breed}`)}
                </span>
              </span>
              <FiChevronRight aria-hidden="true" className="size-4 shrink-0 text-text-muted" />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};
