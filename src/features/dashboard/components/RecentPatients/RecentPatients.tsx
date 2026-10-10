import { clsx } from 'clsx';
import { FiChevronRight, FiClock } from 'react-icons/fi';

import { Card } from '@/components/ui';

import type { DashboardAvatarTone } from '../../dashboard.types';
import type { RecentPatientsProps } from './RecentPatients.types';

const avatarClasses: Record<DashboardAvatarTone, string> = {
  neutral: 'bg-primary-100 text-primary-700',
  primary: 'bg-primary-600 text-neutral-0',
  warning: 'bg-warning text-neutral-0',
};

export const RecentPatients = ({ patients }: RecentPatientsProps) => {
  return (
    <Card className="overflow-hidden" padding="none">
      <div className="border-b border-neutral-200 px-4 py-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-950">
          <FiClock aria-hidden="true" className="size-5 text-primary-600" />
          Pacientes recientes
        </h2>
      </div>
      <ul>
        {patients.map((patient) => (
          <li className="border-b border-neutral-200 last:border-b-0" key={patient.id}>
            <button
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
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
                <span className="block truncate text-sm font-semibold text-neutral-950">
                  {patient.name}
                </span>
                <span className="block truncate text-xs text-neutral-600">
                  {patient.species} · {patient.breed}
                </span>
              </span>
              <FiChevronRight aria-hidden="true" className="size-4 shrink-0 text-neutral-500" />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};
