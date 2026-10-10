import { clsx } from 'clsx';
import { FiFilter, FiList } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa6';
import { Link } from 'react-router';

import { Badge, Card } from '@/components/ui';
import type { BadgeVariant } from '@/components/ui';

import type { AppointmentStatus, DashboardAvatarTone } from '../../dashboard.types';
import type { UpcomingAppointmentsProps } from './UpcomingAppointments.types';

const statusConfig: Record<AppointmentStatus, { label: string; variant: BadgeVariant }> = {
  confirmed: { label: 'Confirmada', variant: 'primary' },
  pending: { label: 'Pendiente', variant: 'warning' },
  scheduled: { label: 'Programada', variant: 'neutral' },
};

const avatarClasses: Record<DashboardAvatarTone, string> = {
  neutral: 'bg-primary-100 text-primary-700',
  primary: 'bg-primary-600 text-neutral-0',
  warning: 'bg-warning text-neutral-0',
};

export const UpcomingAppointments = ({ appointments }: UpcomingAppointmentsProps) => {
  return (
    <Card className="overflow-hidden" padding="none">
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-4 py-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-950">
          <FiList aria-hidden="true" className="size-5 text-primary-600" />
          Próximas citas
        </h2>
        <button
          aria-label="Filtrar próximas citas"
          className="flex size-9 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          type="button"
        >
          <FiFilter aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-collapse text-left text-sm">
          <thead className="bg-neutral-50 text-xs font-medium text-neutral-600">
            <tr>
              <th className="px-4 py-3" scope="col">
                Hora
              </th>
              <th className="px-4 py-3" scope="col">
                Paciente
              </th>
              <th className="px-4 py-3" scope="col">
                Tipo
              </th>
              <th className="px-4 py-3" scope="col">
                Motivo
              </th>
              <th className="px-4 py-3" scope="col">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const status = statusConfig[appointment.status];

              return (
                <tr
                  className={clsx(
                    'border-t border-neutral-200',
                    appointment.status === 'confirmed' && 'bg-primary-50/70',
                  )}
                  key={appointment.id}
                >
                  <th
                    className={clsx(
                      'whitespace-nowrap px-4 py-3 font-semibold',
                      appointment.status === 'pending' ? 'text-warning' : 'text-neutral-950',
                    )}
                    scope="row"
                  >
                    {appointment.time}
                  </th>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                          avatarClasses[appointment.avatarTone],
                        )}
                      >
                        {appointment.initials}
                      </span>
                      <span className="font-semibold text-neutral-950">
                        {appointment.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    <span className="flex items-center gap-1.5">
                      {appointment.species === 'Perro' ? (
                        <FaPaw aria-hidden="true" className="size-3.5" />
                      ) : null}
                      {appointment.species}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-800">{appointment.reason}</td>
                  <td className="px-4 py-3">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-neutral-200 px-4 py-3 text-center">
        <Link
          className="text-sm font-semibold text-primary-700 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          to="/appointments"
        >
          Ver todas las citas de hoy
        </Link>
      </div>
    </Card>
  );
};
