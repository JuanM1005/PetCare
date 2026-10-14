import { valibotResolver } from '@hookform/resolvers/valibot';
import { FiSave, FiUserPlus, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Button, Card, Input, Select } from '@/components/ui';
import type { SelectOption } from '@/components/ui';

import {
  patientFormDefaultValues,
  patientFormSchema,
  patientFormSexes,
  patientFormSpecies,
} from '../../schemas/patient-form.schema';
import type { PatientFormInput, PatientFormValues } from '../../schemas/patient-form.schema';
import type { PatientFormProps } from './PatientForm.types';

const getLocalDateInputValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getFormDefaultValues = (initialValues?: PatientFormValues): PatientFormInput => {
  if (!initialValues) {
    return patientFormDefaultValues;
  }

  return {
    ...initialValues,
    weightKg: String(initialValues.weightKg),
  };
};

/**
 * Formulario compartido por los flujos de creación y edición de pacientes.
 * Solo administra campos, validación y submit; navegación y persistencia pertenecen a la página.
 */
export const PatientForm = ({
  initialValues,
  mode,
  onCancel,
  onSubmit,
  ownerOptions,
}: PatientFormProps) => {
  const { t } = useTranslation('patients');
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<PatientFormInput, undefined, PatientFormValues>({
    defaultValues: getFormDefaultValues(initialValues),
    resolver: valibotResolver(patientFormSchema),
  });
  const speciesOptions: SelectOption[] = patientFormSpecies.map((species) => ({
    label: t(`species.${species}`),
    value: species,
  }));
  const sexOptions: SelectOption[] = patientFormSexes.map((sex) => ({
    label: t(`detail.sex.${sex}`),
    value: sex,
  }));
  const translateError = (message?: string) => (message ? t(message) : undefined);
  const submitLabel = t(`form.actions.${mode}`);
  const SubmitIcon = mode === 'create' ? FiUserPlus : FiSave;

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card padding="lg">
        <div className="border-b border-border pb-4">
          <h2 className="text-lg font-semibold text-text-primary">{t(`form.title.${mode}`)}</h2>
          <p className="mt-1 text-sm text-text-secondary">{t('form.description')}</p>
        </div>

        <fieldset className="mt-5">
          <legend className="text-base font-semibold text-text-primary">
            {t('form.sections.patient')}
          </legend>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                {...register('name')}
                autoComplete="off"
                error={translateError(errors.name?.message)}
                fullWidth
                label={t('form.fields.name.label')}
                maxLength={50}
                placeholder={t('form.fields.name.placeholder')}
                required
                type="text"
              />
            </div>

            <Select
              {...register('species')}
              error={translateError(errors.species?.message)}
              fullWidth
              label={t('form.fields.species.label')}
              options={speciesOptions}
              placeholder={t('form.fields.species.placeholder')}
              required
            />

            <Input
              {...register('breed')}
              autoComplete="off"
              error={translateError(errors.breed?.message)}
              fullWidth
              label={t('form.fields.breed.label')}
              maxLength={60}
              placeholder={t('form.fields.breed.placeholder')}
              required
              type="text"
            />

            <Input
              {...register('birthDate')}
              error={translateError(errors.birthDate?.message)}
              fullWidth
              label={t('form.fields.birthDate.label')}
              max={getLocalDateInputValue(new Date())}
              required
              type="date"
            />

            <Select
              {...register('sex')}
              error={translateError(errors.sex?.message)}
              fullWidth
              label={t('form.fields.sex.label')}
              options={sexOptions}
              placeholder={t('form.fields.sex.placeholder')}
              required
            />

            <Input
              {...register('weightKg')}
              error={translateError(errors.weightKg?.message)}
              fullWidth
              hint={t('form.fields.weight.hint')}
              inputMode="decimal"
              label={t('form.fields.weight.label')}
              min="0"
              placeholder={t('form.fields.weight.placeholder')}
              required
              step="0.1"
              type="number"
            />
          </div>
        </fieldset>
      </Card>

      <Card padding="lg">
        <fieldset>
          <legend className="text-base font-semibold text-text-primary">
            {t('form.sections.owner')}
          </legend>
          <div className="mt-4">
            <Select
              {...register('ownerId')}
              error={translateError(errors.ownerId?.message)}
              fullWidth
              label={t('form.fields.owner.label')}
              options={ownerOptions}
              placeholder={t('form.fields.owner.placeholder')}
              required
            />
          </div>
        </fieldset>
      </Card>

      <div className="flex flex-wrap justify-end gap-3">
        {onCancel ? (
          <Button disabled={isSubmitting} onClick={onCancel} type="button" variant="secondary">
            <FiX aria-hidden="true" className="size-4" />
            {t('form.actions.cancel')}
          </Button>
        ) : null}
        <Button
          isLoading={isSubmitting}
          loadingText={t(`form.actions.${mode}Submitting`)}
          type="submit"
        >
          <SubmitIcon aria-hidden="true" className="size-4" />
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
