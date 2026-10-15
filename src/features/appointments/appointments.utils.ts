import type { PatientListItem } from '@/features/patients';

import type {
  Appointment,
  AppointmentDisplayItem,
  AppointmentFilterState,
  AppointmentStatus,
  CalendarDay,
  Veterinarian,
} from './appointments.types';

export const CLINIC_SCHEDULE = {
  closingTime: '18:00',
  openingTime: '09:00',
  slotMinutes: 30,
} as const;

export const initialAppointmentDate = '2026-10-14';

/**
 * Determina si una cita puede cancelarse mediante el flujo administrativo actual.
 *
 * Las citas en curso, completadas o ya canceladas requieren otros flujos
 * y no pueden cancelarse desde el detalle de la cita.
 */
export const canCancelAppointment = (status: AppointmentStatus): boolean =>
  status === 'scheduled' || status === 'confirmed';

const timeToMinutes = (time: string): number => {
  const [hours = 0, minutes = 0] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
};

/**
 * Calcula la hora de finalización a partir de una hora local y su duración.
 * Mantiene el cálculo en minutos para evitar conversiones UTC innecesarias.
 */
export const getAppointmentEndTime = (startTime: string, durationMinutes: number): string =>
  minutesToTime(timeToMinutes(startTime) + durationMinutes);

export const getLocalDate = (value: string): Date => new Date(`${value}T12:00:00`);

export const getDateValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isValidDateValue = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = getLocalDate(value);
  const [year, month, day] = value.split('-').map(Number);

  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

/**
 * Normaliza una fecha externa antes de utilizarla como valor inicial del formulario.
 * Las fechas inválidas o anteriores al mínimo permitido vuelven al valor seguro indicado.
 */
export const getInitialRegisterDate = (
  requestedDate: string | null,
  minimumDate: string,
): string => {
  return requestedDate && isValidDateValue(requestedDate) && requestedDate >= minimumDate
    ? requestedDate
    : minimumDate;
};

/**
 * Genera las semanas visibles de un mes usando el lunes como primer día.
 * Los espacios vacíos conservan la alineación sin convertir días de otros meses en selecciones.
 */
export const getCalendarMonthDays = (month: Date): Array<CalendarDay | null> => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingDays = Array.from<null>({ length: firstWeekday }).fill(null);
  const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(year, monthIndex, index + 1, 12);

    return { date, value: getDateValue(date) };
  });
  const trailingCount = (7 - ((leadingDays.length + monthDays.length) % 7)) % 7;

  return [...leadingDays, ...monthDays, ...Array.from<null>({ length: trailingCount }).fill(null)];
};

export interface AvailabilityOptions {
  additionalStartTimes?: readonly string[];
  durationMinutes?: number;
  excludeAppointmentId?: string;
  veterinarianId?: string;
}

export const getScheduleStartTimes = (
  durationMinutes: number,
  additionalStartTimes: readonly string[] = [],
): string[] => {
  const openingMinutes = timeToMinutes(CLINIC_SCHEDULE.openingTime);
  const closingMinutes = timeToMinutes(CLINIC_SCHEDULE.closingTime);
  const slots: string[] = [];

  for (
    let slotStart = openingMinutes;
    slotStart + durationMinutes <= closingMinutes;
    slotStart += CLINIC_SCHEDULE.slotMinutes
  ) {
    slots.push(minutesToTime(slotStart));
  }

  const validAdditionalStartTimes = additionalStartTimes.filter((time) => {
    const startMinutes = timeToMinutes(time);

    return startMinutes >= openingMinutes && startMinutes + durationMinutes <= closingMinutes;
  });

  return [...new Set([...slots, ...validAdditionalStartTimes])].toSorted(
    (firstTime, secondTime) => timeToMinutes(firstTime) - timeToMinutes(secondTime),
  );
};

/**
 * Calcula horarios de inicio válidos según fecha, duración y veterinario opcional.
 * Las citas canceladas no bloquean intervalos y la regla sigue siendo una aproximación
 * frontend sin consultorios, descansos ni horarios individuales.
 *
 * Permite excluir una cita durante la edición para evitar que bloquee su propio horario.
 * Los horarios adicionales conservan horas originales que no coinciden con la parrilla regular.
 */
export const getAvailableSlots = (
  sourceAppointments: readonly Appointment[],
  date: string,
  options: AvailabilityOptions = {},
): string[] => {
  const durationMinutes = options.durationMinutes ?? CLINIC_SCHEDULE.slotMinutes;
  const blockingAppointments = sourceAppointments.filter(
    (appointment) =>
      appointment.date === date &&
      appointment.id !== options.excludeAppointmentId &&
      appointment.status !== 'cancelled' &&
      (!options.veterinarianId || appointment.veterinarianId === options.veterinarianId),
  );

  return getScheduleStartTimes(durationMinutes, options.additionalStartTimes).filter((slot) => {
    const slotStart = timeToMinutes(slot);
    const slotEnd = slotStart + durationMinutes;
    const isOccupied = blockingAppointments.some((appointment) => {
      const appointmentStart = timeToMinutes(appointment.startTime);
      const appointmentEnd = appointmentStart + appointment.durationMinutes;

      return appointmentStart < slotEnd && appointmentEnd > slotStart;
    });

    return !isOccupied;
  });
};

export const filterAppointments = (
  sourceAppointments: readonly Appointment[],
  filters: AppointmentFilterState,
): Appointment[] =>
  sourceAppointments.filter(
    (appointment) =>
      (filters.veterinarianId === 'all' || appointment.veterinarianId === filters.veterinarianId) &&
      (filters.status === 'all' || appointment.status === filters.status) &&
      (filters.type === 'all' || appointment.type === filters.type),
  );

export const getAppointmentDisplayItems = (
  sourceAppointments: readonly Appointment[],
  sourcePatients: readonly PatientListItem[],
  sourceVeterinarians: readonly Veterinarian[],
): AppointmentDisplayItem[] =>
  sourceAppointments.reduce<AppointmentDisplayItem[]>((items, appointment) => {
    const patient = sourcePatients.find(({ id }) => id === appointment.patientId);
    const veterinarian = sourceVeterinarians.find(({ id }) => id === appointment.veterinarianId);

    return patient && veterinarian ? [...items, { appointment, patient, veterinarian }] : items;
  }, []);
