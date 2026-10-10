import { FiPlus } from 'react-icons/fi';

import { Button } from '@/components/ui';

import { MetricCard } from './components/MetricCard';
import { QuickActions } from './components/QuickActions';
import { RecentPatients } from './components/RecentPatients';
import { UpcomingAppointments } from './components/UpcomingAppointments';
import { dashboardMetrics, recentPatients, upcomingAppointments } from './dashboard.mock';

export const DashboardPage = () => {
  return (
    <div className="flex min-h-full flex-col gap-5 p-6">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-950">Buenos días, Dr. Carlos</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            En línea · Todos los cambios sincronizados
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">Registrar paciente</Button>
          <Button>
            <FiPlus aria-hidden="true" className="size-4" />
            Nueva cita
          </Button>
        </div>
      </section>

      <section
        aria-label="Resumen de la clínica"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <UpcomingAppointments appointments={upcomingAppointments} />
        </div>
        <aside className="flex min-w-0 flex-col gap-5" aria-label="Widgets del dashboard">
          <QuickActions />
          <RecentPatients patients={recentPatients} />
        </aside>
      </div>
    </div>
  );
};
