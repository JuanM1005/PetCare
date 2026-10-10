import { FiActivity, FiCalendar, FiSearch, FiUserPlus, FiZap } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

interface QuickAction {
  icon: IconType;
  labelKey:
    | 'quickActions.registerPatient'
    | 'quickActions.createAppointment'
    | 'quickActions.startConsultation'
    | 'quickActions.searchRecords';
  to?: string;
}

const quickActions = [
  { icon: FiUserPlus, labelKey: 'quickActions.registerPatient', to: '/patients/new' },
  { icon: FiCalendar, labelKey: 'quickActions.createAppointment', to: '/appointments/new' },
  { icon: FiActivity, labelKey: 'quickActions.startConsultation' },
  { icon: FiSearch, labelKey: 'quickActions.searchRecords', to: '/medical-records' },
] satisfies readonly QuickAction[];

const actionClassName =
  'flex min-h-20 flex-col items-center justify-center gap-2 rounded-md bg-neutral-800 p-3 text-center text-xs font-semibold text-neutral-0 transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900';

export const QuickActions = () => {
  const { t } = useTranslation('dashboard');

  return (
    <section
      className="rounded-lg bg-neutral-900 p-4 text-neutral-0"
      aria-labelledby="quick-actions-title"
    >
      <h2 className="flex items-center gap-2 text-lg font-semibold" id="quick-actions-title">
        <FiZap aria-hidden="true" className="size-5 text-primary-300" />
        {t('quickActions.title')}
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {quickActions.map(({ icon: Icon, labelKey, to }) => {
          const label = t(labelKey);

          return to ? (
            <Link className={actionClassName} key={labelKey} to={to}>
              <Icon aria-hidden="true" className="size-5 text-primary-300" />
              {label}
            </Link>
          ) : (
            <button className={actionClassName} key={labelKey} type="button">
              <Icon aria-hidden="true" className="size-5 text-primary-300" />
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
