import {
  check,
  type InferInput,
  type InferOutput,
  maxLength,
  minLength,
  minValue,
  nonEmpty,
  object,
  pipe,
  string,
  toNumber,
  transform,
  trim,
} from 'valibot';

import type { PatientSex, Species } from '../patients.types';

export const patientFormSpecies = ['dog', 'cat', 'bird', 'other'] as const;
export const patientFormSexes = ['male', 'female'] as const;

const isSpecies = (value: string): value is Species =>
  patientFormSpecies.some((species) => species === value);

const isPatientSex = (value: string): value is PatientSex =>
  patientFormSexes.some((sex) => sex === value);

const getLocalDate = (value: string) => new Date(`${value}T00:00:00`);

const isValidLocalDate = (value: string): boolean => {
  const date = getLocalDate(value);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

const isNotFutureDate = (value: string): boolean => {
  if (!isValidLocalDate(value)) {
    return true;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return getLocalDate(value) <= today;
};

/**
 * Usa claves de i18n como mensajes para conservar un único schema en español e inglés.
 * El peso entra como texto desde el control HTML y Valibot lo entrega como número validado.
 */
export const patientFormSchema = object({
  name: pipe(
    string(),
    trim(),
    nonEmpty('form.validation.nameRequired'),
    minLength(2, 'form.validation.nameMinLength'),
    maxLength(50, 'form.validation.nameMaxLength'),
  ),
  species: pipe(
    string(),
    nonEmpty('form.validation.speciesRequired'),
    check(isSpecies, 'form.validation.speciesInvalid'),
    transform((value) => value as Species),
  ),
  breed: pipe(
    string(),
    trim(),
    nonEmpty('form.validation.breedRequired'),
    minLength(2, 'form.validation.breedMinLength'),
    maxLength(60, 'form.validation.breedMaxLength'),
  ),
  birthDate: pipe(
    string(),
    trim(),
    nonEmpty('form.validation.birthDateRequired'),
    check(isValidLocalDate, 'form.validation.birthDateInvalid'),
    check(isNotFutureDate, 'form.validation.birthDateFuture'),
  ),
  sex: pipe(
    string(),
    nonEmpty('form.validation.sexRequired'),
    check(isPatientSex, 'form.validation.sexInvalid'),
    transform((value) => value as PatientSex),
  ),
  weightKg: pipe(
    string(),
    trim(),
    nonEmpty('form.validation.weightRequired'),
    toNumber('form.validation.weightNumber'),
    minValue(Number.MIN_VALUE, 'form.validation.weightPositive'),
  ),
  ownerId: pipe(string(), nonEmpty('form.validation.ownerRequired')),
});

export type PatientFormInput = InferInput<typeof patientFormSchema>;
export type PatientFormValues = InferOutput<typeof patientFormSchema>;

export const patientFormDefaultValues: PatientFormInput = {
  name: '',
  species: '',
  breed: '',
  birthDate: '',
  sex: '',
  weightKg: '',
  ownerId: '',
};
