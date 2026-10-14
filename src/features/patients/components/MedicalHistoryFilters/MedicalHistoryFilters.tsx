import { useTranslation } from 'react-i18next';

import { Card, Select } from '@/components/ui';

import type { MedicalHistoryPeriod, MedicalRecordTypeFilter } from '../../patients.types';
import type { MedicalHistoryFiltersProps } from './MedicalHistoryFilters.types';

export const MedicalHistoryFilters = ({
  onPeriodChange,
  onRecordTypeChange,
  onVeterinarianChange,
  period,
  recordType,
  veterinarianId,
  veterinarians,
}: MedicalHistoryFiltersProps) => {
  const { t } = useTranslation('patients');
  const periodOptions = [
    { label: t('history.filters.period.options.3m'), value: '3m' },
    { label: t('history.filters.period.options.6m'), value: '6m' },
    { label: t('history.filters.period.options.12m'), value: '12m' },
    { label: t('history.filters.period.options.all'), value: 'all' },
  ];
  const recordTypeOptions = [
    { label: t('history.filters.recordType.options.all'), value: 'all' },
    { label: t('history.recordTypes.consultation'), value: 'consultation' },
    { label: t('history.recordTypes.vaccination'), value: 'vaccination' },
    { label: t('history.recordTypes.checkup'), value: 'checkup' },
    { label: t('history.recordTypes.procedure'), value: 'procedure' },
  ];
  const veterinarianOptions = [
    { label: t('history.filters.veterinarian.any'), value: 'all' },
    ...veterinarians.map((veterinarian) => ({
      label: veterinarian.name,
      value: veterinarian.id,
    })),
  ];

  return (
    <Card className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" padding="md">
      <Select
        fullWidth
        label={t('history.filters.period.label')}
        onChange={(event) => onPeriodChange(event.target.value as MedicalHistoryPeriod)}
        options={periodOptions}
        value={period}
      />
      <Select
        fullWidth
        label={t('history.filters.recordType.label')}
        onChange={(event) => onRecordTypeChange(event.target.value as MedicalRecordTypeFilter)}
        options={recordTypeOptions}
        value={recordType}
      />
      <div className="sm:col-span-2 xl:col-span-1">
        <Select
          fullWidth
          label={t('history.filters.veterinarian.label')}
          onChange={(event) => onVeterinarianChange(event.target.value)}
          options={veterinarianOptions}
          value={veterinarianId}
        />
      </div>
    </Card>
  );
};
