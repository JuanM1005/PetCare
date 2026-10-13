export interface PatientAgeParts {
  months: number;
  years: number;
}

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
