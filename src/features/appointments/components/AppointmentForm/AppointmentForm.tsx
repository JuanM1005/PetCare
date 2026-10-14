import { valibotResolver } from '@hookform/resolvers/valibot';
import { useEffect, useMemo } from 'react';
import { FiCalendar, FiCheck, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { Badge, Button, Card, Select, Textarea } from '@/components/ui';
import type { SelectOption } from '@/components/ui';

import { getAvailableSlots, getScheduleStartTimes } from '../../appointments.utils';
import {
  appointmentDurations,
  appointmentFormDefaultValues,
  appointmentFormTypes,
  createAppointmentFormSchema,
} from '../../schemas/appointment-form.schema';
import type {
  AppointmentDuration,
  AppointmentFormInput,
  AppointmentFormValues,
} from '../../schemas/appointment-form.schema';
import { AppointmentCalendar } from '../AppointmentCalendar';
import { PatientPicker } from '../PatientPicker';
import { TimeSlotPicker } from '../TimeSlotPicker';
import type { AppointmentFormProps } from './AppointmentForm.types';

const isSupportedDuration = (value: number): value is AppointmentDuration =>
  appointmentDurations.some((duration) => duration === value);

/**
 * Formulario compartido por los futuros flujos de creación y edición de citas.
 * Recibe datos auxiliares por props para no depender de mocks, rutas ni persistencia.
 */
export const AppointmentForm = ({
  appointments,
  initialValues,
  minimumDate,
  mode,
  onCancel,
  onSubmit,
  patients,
  veterinarians,
}: AppointmentFormProps) => {
  const { t } = useTranslation('appointments');
  const schema = useMemo(
    () =>
      createAppointmentFormSchema({
        minimumDate,
        patientIds: patients.map(({ id }) => id),
        veterinarianIds: veterinarians.map(({ id }) => id),
      }),
    [minimumDate, patients, veterinarians],
  );
  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<AppointmentFormInput, undefined, AppointmentFormValues>({
    defaultValues: {
      ...appointmentFormDefaultValues,
      date: minimumDate,
      ...initialValues,
    },
    resolver: valibotResolver(schema),
  });
  const selectedDate = useWatch({ control, name: 'date' });
  const selectedDurationValue = useWatch({ control, name: 'durationMinutes' });
  const selectedTime = useWatch({ control, name: 'startTime' });
  const selectedVeterinarianId = useWatch({ control, name: 'veterinarianId' });
  const parsedDuration = Number(selectedDurationValue);
  const selectedDuration = isSupportedDuration(parsedDuration) ? parsedDuration : 30;
  const availableSlots = useMemo(
    () =>
      selectedDate && selectedVeterinarianId
        ? getAvailableSlots(appointments, selectedDate, {
            durationMinutes: selectedDuration,
            veterinarianId: selectedVeterinarianId,
          })
        : [],
    [appointments, selectedDate, selectedDuration, selectedVeterinarianId],
  );
  const scheduleStartTimes = useMemo(
    () => getScheduleStartTimes(selectedDuration),
    [selectedDuration],
  );
  const translateError = (message?: string) => (message ? t(message) : undefined);
  const typeOptions: SelectOption[] = appointmentFormTypes.map((type) => ({
    label: t(`types.${type}`),
    value: type,
  }));
  const veterinarianOptions: SelectOption[] = veterinarians.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
  const durationOptions: SelectOption[] = appointmentDurations.map((duration) => ({
    label: t('register.fields.duration.option', { count: duration }),
    value: String(duration),
  }));

  useEffect(() => {
    if (selectedTime && !availableSlots.includes(selectedTime)) {
      setValue('startTime', '', { shouldDirty: true });
      clearErrors('startTime');
    }
  }, [availableSlots, clearErrors, selectedTime, setValue]);

  return (
    <form className="flex min-w-0 flex-col gap-5" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <Card padding="lg">
            <fieldset>
              <legend className="text-lg font-semibold text-text-primary">
                {t('register.sections.patient')}
              </legend>
              <div className="mt-4">
                <Controller
                  control={control}
                  name="patientId"
                  render={({ field }) => (
                    <PatientPicker
                      disabled={isSubmitting}
                      error={translateError(errors.patientId?.message)}
                      onChange={field.onChange}
                      patients={patients}
                      value={field.value}
                    />
                  )}
                />
              </div>
            </fieldset>
          </Card>

          <Card padding="lg">
            <fieldset>
              <legend className="text-lg font-semibold text-text-primary">
                {t('register.sections.details')}
              </legend>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Select
                  {...register('type')}
                  error={translateError(errors.type?.message)}
                  fullWidth
                  label={t('register.fields.type.label')}
                  options={typeOptions}
                  placeholder={t('register.fields.type.placeholder')}
                  required
                />
                <Select
                  {...register('veterinarianId')}
                  error={translateError(errors.veterinarianId?.message)}
                  fullWidth
                  label={t('register.fields.veterinarian.label')}
                  options={veterinarianOptions}
                  placeholder={t('register.fields.veterinarian.placeholder')}
                  required
                />
                <Select
                  {...register('durationMinutes')}
                  error={translateError(errors.durationMinutes?.message)}
                  fullWidth
                  label={t('register.fields.duration.label')}
                  options={durationOptions}
                  required
                />
                <div className="md:col-span-2">
                  <Textarea
                    {...register('notes')}
                    error={translateError(errors.notes?.message)}
                    fullWidth
                    label={t('register.fields.notes.label')}
                    maxLength={500}
                    placeholder={t('register.fields.notes.placeholder')}
                    showCount
                  />
                </div>
              </div>
            </fieldset>
          </Card>
        </div>

        <section aria-labelledby="appointment-date-time-title" className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2
              className="flex items-center gap-2 text-lg font-semibold text-text-primary"
              id="appointment-date-time-title"
            >
              <FiCalendar aria-hidden="true" className="size-5 text-primary-600" />
              {t('register.sections.dateTime')}
            </h2>
            {selectedVeterinarianId ? (
              <Badge variant={availableSlots.length > 0 ? 'success' : 'warning'}>
                {t(
                  availableSlots.length > 0
                    ? 'register.availability.available'
                    : 'register.availability.unavailable',
                )}
              </Badge>
            ) : null}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-sm font-medium text-text-primary">
                {t('register.fields.date.label')}
              </p>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <AppointmentCalendar
                    isDateDisabled={(date) => date < minimumDate}
                    onDateSelect={(date) => field.onChange(date)}
                    selectedDate={field.value}
                  />
                )}
              />
              {errors.date?.message ? (
                <p className="mt-2 text-xs font-medium text-danger">
                  {translateError(errors.date.message)}
                </p>
              ) : null}
            </div>

            <Card padding="lg">
              <Controller
                control={control}
                name="startTime"
                render={({ field }) => (
                  <TimeSlotPicker
                    availableSlots={availableSlots}
                    disabled={isSubmitting}
                    error={translateError(errors.startTime?.message)}
                    hasVeterinarian={Boolean(selectedVeterinarianId)}
                    onSelect={field.onChange}
                    selectedTime={field.value}
                    slots={scheduleStartTimes}
                  />
                )}
              />
            </Card>
          </div>
        </section>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-5">
        {onCancel ? (
          <Button disabled={isSubmitting} onClick={onCancel} type="button" variant="secondary">
            <FiX aria-hidden="true" className="size-4" />
            {t('register.actions.cancel')}
          </Button>
        ) : null}
        <Button
          isLoading={isSubmitting}
          loadingText={t(`register.actions.${mode}Submitting`)}
          type="submit"
        >
          <FiCheck aria-hidden="true" className="size-4" />
          {t(`register.actions.${mode}`)}
        </Button>
      </div>
    </form>
  );
};
