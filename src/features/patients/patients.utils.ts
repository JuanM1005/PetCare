import type {
  MedicalHistoryFilterState,
  MedicalHistoryPeriod,
  PatientAppointment,
  PatientAppointmentFilterState,
  PatientMedicalRecord,
  PatientListItem,
  PatientWeightRecord,
} from './patients.types';

import type { SelectOption } from '@/components/ui';

export interface PatientAgeParts {
  months: number;
  years: number;
}

const periodMonths: Record<Exclude<MedicalHistoryPeriod, 'all'>, number> = {
  '3m': 3,
  '6m': 6,
  '12m': 12,
};

const getLocalDate = (date: string, time = '00:00') => new Date(`${date}T${time}:00`);

export const getPatientOwnerOptions = (patients: PatientListItem[]): SelectOption[] =>
  patients.reduce<SelectOption[]>((options, patient) => {
    if (options.some((option) => option.value === patient.owner.id)) {
      return options;
    }

    return [...options, { label: patient.owner.name, value: patient.owner.id }];
  }, []);

/**
 * Comprueba si una fecha ISO está dentro de un periodo relativo.
 * Se interpreta en horario local para evitar cambios de día por zona horaria.
 */
export const isDateWithinPeriod = (
  date: string,
  period: MedicalHistoryPeriod,
  referenceDate = new Date(),
): boolean => {
  if (period === 'all') {
    return true;
  }

  const periodStart = new Date(referenceDate);
  periodStart.setMonth(periodStart.getMonth() - periodMonths[period]);

  return getLocalDate(date) >= periodStart;
};

export const getPatientAgeParts = (
  birthDate: string,
  referenceDate = new Date(),
): PatientAgeParts => {
  const birth = new Date(`${birthDate}T00:00:00`);
  let years = referenceDate.getFullYear() - birth.getFullYear();
  let months = referenceDate.getMonth() - birth.getMonth();

  if (referenceDate.getDate() < birth.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { months: Math.max(months, 0), years: Math.max(years, 0) };
};

/**
 * Aplica los filtros locales del historial usando la fecha actual como límite del periodo.
 * Las fechas ISO se interpretan en horario local para evitar cambios de día por zona horaria.
 */
export const filterMedicalRecords = (
  records: PatientMedicalRecord[],
  filters: MedicalHistoryFilterState,
  referenceDate = new Date(),
): PatientMedicalRecord[] => {
  return records.filter((record) => {
    const matchesPeriod = isDateWithinPeriod(record.date, filters.period, referenceDate);
    const matchesType = filters.recordType === 'all' || record.type === filters.recordType;
    const matchesVeterinarian =
      filters.veterinarianId === 'all' || record.veterinarian.id === filters.veterinarianId;

    return matchesPeriod && matchesType && matchesVeterinarian;
  });
};

export interface PatientAppointmentsByTiming {
  history: PatientAppointment[];
  upcoming: PatientAppointment[];
}

/**
 * Separa y ordena las citas respecto al momento de consulta.
 * Una cita que comienza exactamente en ese momento todavía se considera próxima.
 */
export const groupPatientAppointments = (
  appointments: PatientAppointment[],
  referenceDate = new Date(),
): PatientAppointmentsByTiming => {
  const upcoming = appointments
    .filter((appointment) => getLocalDate(appointment.date, appointment.time) >= referenceDate)
    .toSorted((first, second) =>
      `${first.date}T${first.time}`.localeCompare(`${second.date}T${second.time}`),
    );
  const history = appointments
    .filter((appointment) => getLocalDate(appointment.date, appointment.time) < referenceDate)
    .toSorted((first, second) =>
      `${second.date}T${second.time}`.localeCompare(`${first.date}T${first.time}`),
    );

  return { history, upcoming };
};

export const filterPatientAppointments = (
  appointments: PatientAppointment[],
  filters: PatientAppointmentFilterState,
  referenceDate = new Date(),
): PatientAppointment[] =>
  appointments.filter(
    (appointment) =>
      isDateWithinPeriod(appointment.date, filters.period, referenceDate) &&
      (filters.status === 'all' || appointment.status === filters.status),
  );

export interface PatientWeightEvolution {
  changeKg: number;
  current: PatientWeightRecord;
  previous: PatientWeightRecord;
}

/**
 * Compara el registro de peso más reciente con el más antiguo disponible.
 * Devuelve `null` cuando no hay al menos dos mediciones que permitan calcular evolución.
 */
export const getPatientWeightEvolution = (
  records: PatientWeightRecord[],
): PatientWeightEvolution | null => {
  if (records.length < 2) {
    return null;
  }

  const sortedRecords = records.toSorted((first, second) => first.date.localeCompare(second.date));
  const previous = sortedRecords[0];
  const current = sortedRecords.at(-1);

  if (!previous || !current) {
    return null;
  }

  return {
    changeKg: Number((current.weightKg - previous.weightKg).toFixed(1)),
    current,
    previous,
  };
};
