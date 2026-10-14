import type { PatientListItem } from '@/features/patients';

import type {
  Appointment,
  AppointmentDisplayItem,
  AppointmentFilterState,
  CalendarDay,
  Veterinarian,
} from './appointments.types';

export const CLINIC_SCHEDULE = {
  closingTime: '18:00',
  openingTime: '09:00',
  slotMinutes: 30,
} as const;

export const initialAppointmentDate = '2026-10-14';

const timeToMinutes = (time: string): number => {
  const [hours = 0, minutes = 0] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
};

export const getLocalDate = (value: string): Date => new Date(`${value}T12:00:00`);

export const getDateValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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

/**
 * Calcula los espacios disponibles de la agenda mock a partir del horario clínico.
 * La regla es provisional: no contempla disponibilidad por veterinario ni consultorio.
 */
export const getAvailableSlots = (
  sourceAppointments: readonly Appointment[],
  date: string,
): string[] => {
  const openingMinutes = timeToMinutes(CLINIC_SCHEDULE.openingTime);
  const closingMinutes = timeToMinutes(CLINIC_SCHEDULE.closingTime);
  const blockingAppointments = sourceAppointments.filter(
    (appointment) => appointment.date === date && appointment.status !== 'cancelled',
  );
  const slots: string[] = [];

  for (
    let slotStart = openingMinutes;
    slotStart + CLINIC_SCHEDULE.slotMinutes <= closingMinutes;
    slotStart += CLINIC_SCHEDULE.slotMinutes
  ) {
    const slotEnd = slotStart + CLINIC_SCHEDULE.slotMinutes;
    const isOccupied = blockingAppointments.some((appointment) => {
      const appointmentStart = timeToMinutes(appointment.startTime);
      const appointmentEnd = appointmentStart + appointment.durationMinutes;

      return appointmentStart < slotEnd && appointmentEnd > slotStart;
    });

    if (!isOccupied) {
      slots.push(minutesToTime(slotStart));
    }
  }

  return slots;
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
