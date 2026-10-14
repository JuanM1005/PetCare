import { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Button, Card, Select } from '@/components/ui';
import type { SelectOption } from '@/components/ui';
import { PatientAvatar } from '@/features/patients/components/PatientAvatar';

import type { PatientPickerProps } from './PatientPicker.types';

export const PatientPicker = ({
  disabled = false,
  error,
  onChange,
  patients,
  value,
}: PatientPickerProps) => {
  const [showSelector, setShowSelector] = useState(() => !value);
  const { t } = useTranslation(['appointments', 'patients']);
  const selectedPatient = patients.find((patient) => patient.id === value);
  const options: SelectOption[] = patients.map((patient) => ({
    label: `${patient.name} — ${patient.owner.name}`,
    value: patient.id,
  }));

  if (selectedPatient && !showSelector) {
    return (
      <Card className="flex flex-wrap items-center gap-3" padding="md" variant="outline">
        <PatientAvatar initials={selectedPatient.initials} name={selectedPatient.name} size="sm" />
        <div className="min-w-32 flex-1">
          <p className="truncate font-semibold text-text-primary">{selectedPatient.name}</p>
          <p className="truncate text-sm text-text-secondary">
            {t(`patients:species.${selectedPatient.species}`)} · {selectedPatient.owner.name}
          </p>
        </div>
        <Button
          disabled={disabled}
          onClick={() => setShowSelector(true)}
          size="sm"
          type="button"
          variant="ghost"
        >
          <FiRefreshCw aria-hidden="true" className="size-4" />
          {t('appointments:register.patient.change')}
        </Button>
      </Card>
    );
  }

  return (
    <Select
      disabled={disabled}
      error={error}
      fullWidth
      label={t('appointments:register.patient.label')}
      onChange={(event) => {
        const patientId = event.currentTarget.value;

        onChange(patientId);
        if (patientId) {
          setShowSelector(false);
        }
      }}
      options={options}
      placeholder={t('appointments:register.patient.placeholder')}
      required
      value={value}
    />
  );
};
