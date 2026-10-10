import { useTranslation } from 'react-i18next';

import { DashboardDateTime } from './components/DashboardDateTime';
import { MetricCard } from './components/MetricCard';
import { QuickActions } from './components/QuickActions';
import { RecentPatients } from './components/RecentPatients';
import { UpcomingAppointments } from './components/UpcomingAppointments';
import { dashboardMetrics, recentPatients, upcomingAppointments } from './dashboard.mock';

export const DashboardPage = () => {
  const { t } = useTranslation('dashboard');

  return (
    <div className="flex min-h-full flex-col gap-5 p-6 text-text-primary">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-text-primary">{t('greeting')}</h2>
        <DashboardDateTime />
      </section>

      <section aria-label={t('summaryLabel')} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <div className="grid flex-1 items-stretch gap-5 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <UpcomingAppointments appointments={upcomingAppointments} />
        </div>
        <aside className="flex min-w-0 flex-col gap-5" aria-label={t('widgetsLabel')}>
          <QuickActions />
          <RecentPatients patients={recentPatients} />
        </aside>
      </div>
    </div>
  );
};
