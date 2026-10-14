import {
  check,
  type InferInput,
  type InferOutput,
  maxLength,
  nonEmpty,
  object,
  pipe,
  string,
  toNumber,
  transform,
  trim,
} from 'valibot';

import type { AppointmentDuration, AppointmentType } from '../appointments.types';
import { isValidDateValue } from '../appointments.utils';

export const appointmentFormTypes = [
  'general_consultation',
  'vaccination',
  'checkup',
  'weight_control',
] as const satisfies readonly AppointmentType[];

export const appointmentDurations = [30, 60, 90] as const satisfies readonly AppointmentDuration[];

export interface AppointmentFormSchemaOptions {
  minimumDate: string;
  patientIds: readonly string[];
  veterinarianIds: readonly string[];
}

const isAppointmentType = (value: string): value is AppointmentType =>
  appointmentFormTypes.some((type) => type === value);

const isAppointmentDuration = (value: number): value is AppointmentDuration =>
  appointmentDurations.some((duration) => duration === value);

/**
 * Construye el schema con los identificadores disponibles y la fecha mínima del flujo.
 * Esto permite validar selecciones dinámicas sin acoplar el formulario a los mocks.
 */
export const createAppointmentFormSchema = ({
  minimumDate,
  patientIds,
  veterinarianIds,
}: AppointmentFormSchemaOptions) =>
  object({
    patientId: pipe(
      string(),
      nonEmpty('register.validation.patientRequired'),
      check((value) => patientIds.includes(value), 'register.validation.patientInvalid'),
    ),
    type: pipe(
      string(),
      nonEmpty('register.validation.typeRequired'),
      check(isAppointmentType, 'register.validation.typeInvalid'),
      transform((value) => value as AppointmentType),
    ),
    veterinarianId: pipe(
      string(),
      nonEmpty('register.validation.veterinarianRequired'),
      check((value) => veterinarianIds.includes(value), 'register.validation.veterinarianInvalid'),
    ),
    durationMinutes: pipe(
      string(),
      nonEmpty('register.validation.durationRequired'),
      toNumber('register.validation.durationInvalid'),
      check(isAppointmentDuration, 'register.validation.durationInvalid'),
      transform((value) => value as AppointmentDuration),
    ),
    notes: pipe(string(), trim(), maxLength(500, 'register.validation.notesMaxLength')),
    date: pipe(
      string(),
      nonEmpty('register.validation.dateRequired'),
      check(isValidDateValue, 'register.validation.dateInvalid'),
      check((value) => value >= minimumDate, 'register.validation.datePast'),
    ),
    startTime: pipe(string(), nonEmpty('register.validation.startTimeRequired')),
  });

export type AppointmentFormSchema = ReturnType<typeof createAppointmentFormSchema>;
export type AppointmentFormInput = InferInput<AppointmentFormSchema>;
export type AppointmentFormValues = InferOutput<AppointmentFormSchema>;

export const appointmentFormDefaultValues: AppointmentFormInput = {
  patientId: '',
  type: '',
  veterinarianId: '',
  durationMinutes: '30',
  notes: '',
  date: '',
  startTime: '',
};
