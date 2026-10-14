import type {
  MedicalHistoryFilterState,
  MedicalHistoryPeriod,
  PatientMedicalRecord,
  PatientWeightRecord,
} from './patients.types';

export interface PatientAgeParts {
  months: number;
  years: number;
}

const periodMonths: Record<Exclude<MedicalHistoryPeriod, 'all'>, number> = {
  '3m': 3,
  '6m': 6,
  '12m': 12,
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
  const periodStart = new Date(referenceDate);

  if (filters.period !== 'all') {
    periodStart.setMonth(periodStart.getMonth() - periodMonths[filters.period]);
  }

  return records.filter((record) => {
    const recordDate = new Date(`${record.date}T00:00:00`);
    const matchesPeriod = filters.period === 'all' || recordDate >= periodStart;
    const matchesType = filters.recordType === 'all' || record.type === filters.recordType;
    const matchesVeterinarian =
      filters.veterinarianId === 'all' || record.veterinarian.id === filters.veterinarianId;

    return matchesPeriod && matchesType && matchesVeterinarian;
  });
};

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
