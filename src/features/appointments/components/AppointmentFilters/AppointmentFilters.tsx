import { useTranslation } from 'react-i18next';

import { Select } from '@/components/ui';
import type { SelectOption } from '@/components/ui';

import { veterinarians } from '../../appointments.mock';
import type {
  AppointmentStatus,
  AppointmentStatusFilter,
  AppointmentType,
  AppointmentTypeFilter,
} from '../../appointments.types';
import type { AppointmentFiltersProps } from './AppointmentFilters.types';

const statusValues: AppointmentStatus[] = [
  'scheduled',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
];
const typeValues: AppointmentType[] = [
  'general_consultation',
  'vaccination',
  'checkup',
  'weight_control',
];

export const AppointmentFilters = ({ filters, onChange }: AppointmentFiltersProps) => {
  const { t } = useTranslation('appointments');
  const veterinarianOptions: SelectOption[] = [
    { label: t('filters.veterinarian.all'), value: 'all' },
    ...veterinarians.map(({ id, name }) => ({ label: name, value: id })),
  ];
  const statusOptions: SelectOption[] = [
    { label: t('filters.status.all'), value: 'all' },
    ...statusValues.map((status) => ({ label: t(`statuses.${status}`), value: status })),
  ];
  const typeOptions: SelectOption[] = [
    { label: t('filters.type.all'), value: 'all' },
    ...typeValues.map((type) => ({ label: t(`types.${type}`), value: type })),
  ];

  return (
    <div className="flex flex-wrap items-end gap-3">
      <Select
        className="min-w-48"
        label={t('filters.veterinarian.label')}
        onChange={(event) => onChange({ ...filters, veterinarianId: event.target.value })}
        options={veterinarianOptions}
        value={filters.veterinarianId}
      />
      <Select
        className="min-w-44"
        label={t('filters.status.label')}
        onChange={(event) =>
          onChange({ ...filters, status: event.target.value as AppointmentStatusFilter })
        }
        options={statusOptions}
        value={filters.status}
      />
      <Select
        className="min-w-44"
        label={t('filters.type.label')}
        onChange={(event) =>
          onChange({ ...filters, type: event.target.value as AppointmentTypeFilter })
        }
        options={typeOptions}
        value={filters.type}
      />
    </div>
  );
};
