import { FiUserPlus } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Button, Card, Input, Select } from '@/components/ui';

import type { PatientStatusFilter, SpeciesFilter } from '../../patients.types';
import type { PatientsToolbarProps } from './PatientsToolbar.types';

export const PatientsToolbar = ({
  onSearchChange,
  onSpeciesChange,
  onStatusChange,
  searchValue,
  species,
  status,
}: PatientsToolbarProps) => {
  const { t } = useTranslation('patients');
  const speciesOptions = [
    { label: t('filters.species.all'), value: 'all' },
    { label: t('species.dog'), value: 'dog' },
    { label: t('species.cat'), value: 'cat' },
    { label: t('species.bird'), value: 'bird' },
    { label: t('species.other'), value: 'other' },
  ];
  const statusOptions = [
    { label: t('filters.status.all'), value: 'all' },
    { label: t('status.active'), value: 'active' },
    { label: t('status.inactive'), value: 'inactive' },
  ];

  return (
    <Card className="flex flex-wrap items-end gap-3" padding="md">
      <div className="min-w-60 flex-1">
        <Input
          aria-label={t('toolbar.searchLabel')}
          fullWidth
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('toolbar.searchPlaceholder')}
          type="search"
          value={searchValue}
        />
      </div>

      <Select
        aria-label={t('filters.species.label')}
        className="min-w-40"
        onChange={(event) => onSpeciesChange(event.target.value as SpeciesFilter)}
        options={speciesOptions}
        value={species}
      />
      <Select
        aria-label={t('filters.status.label')}
        className="min-w-40"
        onChange={(event) => onStatusChange(event.target.value as PatientStatusFilter)}
        options={statusOptions}
        value={status}
      />

      <Button disabled title={t('actions.availableSoon')}>
        <FiUserPlus aria-hidden="true" className="size-4" />
        {t('actions.register')}
      </Button>
    </Card>
  );
};
