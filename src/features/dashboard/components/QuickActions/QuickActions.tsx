import { FiActivity, FiCalendar, FiSearch, FiUserPlus, FiZap } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { Link } from 'react-router';

interface QuickAction {
  icon: IconType;
  label: string;
  to?: string;
}

const quickActions = [
  { icon: FiUserPlus, label: 'Registrar paciente', to: '/patients/new' },
  { icon: FiCalendar, label: 'Crear cita', to: '/appointments/new' },
  { icon: FiActivity, label: 'Iniciar consulta' },
  { icon: FiSearch, label: 'Buscar historial', to: '/medical-records' },
] satisfies readonly QuickAction[];

const actionClassName =
  'flex min-h-20 flex-col items-center justify-center gap-2 rounded-md bg-neutral-800 p-3 text-center text-xs font-semibold text-neutral-0 transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900';

export const QuickActions = () => {
  return (
    <section
      className="rounded-lg bg-neutral-900 p-4 text-neutral-0"
      aria-labelledby="quick-actions-title"
    >
      <h2 className="flex items-center gap-2 text-lg font-semibold" id="quick-actions-title">
        <FiZap aria-hidden="true" className="size-5 text-primary-300" />
        Acciones rápidas
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {quickActions.map(({ icon: Icon, label, to }) =>
          to ? (
            <Link className={actionClassName} key={label} to={to}>
              <Icon aria-hidden="true" className="size-5 text-primary-300" />
              {label}
            </Link>
          ) : (
            <button className={actionClassName} key={label} type="button">
              <Icon aria-hidden="true" className="size-5 text-primary-300" />
              {label}
            </button>
          ),
        )}
      </div>
    </section>
  );
};
