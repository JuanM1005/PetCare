import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import type { PatientDetailTabsProps } from './PatientDetailTabs.types';

const tabClassName =
  'border-b-2 px-1 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500';

export const PatientDetailTabs = ({ patientId }: PatientDetailTabsProps) => {
  const { t } = useTranslation('patients');

  return (
    <nav aria-label={t('detail.tabs.label')} className="overflow-x-auto border-b border-border">
      <div className="flex min-w-max gap-6">
        <NavLink
          className={({ isActive }) =>
            clsx(
              tabClassName,
              isActive
                ? 'border-primary-500 font-semibold text-primary-600'
                : 'border-transparent text-text-muted hover:text-text-primary',
            )
          }
          end
          to={`/patients/${patientId}`}
        >
          {t('detail.tabs.summary')}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(
              tabClassName,
              isActive
                ? 'border-primary-500 font-semibold text-primary-600'
                : 'border-transparent text-text-muted hover:text-text-primary',
            )
          }
          to={`/patients/${patientId}/history`}
        >
          {t('detail.tabs.history')}
        </NavLink>
        <button
          aria-disabled="true"
          className="cursor-not-allowed border-b-2 border-transparent px-1 py-3 text-sm font-medium text-text-muted opacity-60"
          disabled
          type="button"
        >
          {t('detail.tabs.appointments')}
        </button>
      </div>
    </nav>
  );
};
