import type { Appointment, AppointmentStatus } from './appointments.types';

const activeAppointmentStatuses: readonly AppointmentStatus[] = [
  'scheduled',
  'confirmed',
  'in_progress',
];

/**
 * Obtiene la cantidad de citas que todavía forman parte del flujo operativo
 * de la clínica.
 *
 * Las citas completadas o canceladas no participan en el contador mostrado
 * en la navegación.
 */
export const getActiveAppointmentsCount = (sourceAppointments: readonly Appointment[]): number =>
  sourceAppointments.filter(({ status }) => activeAppointmentStatuses.includes(status)).length;
