import { useState } from 'react';
import { useOutletContext } from 'react-router';

import { MedicalHistoryFilters } from '../../components/MedicalHistoryFilters';
import type { MedicalHistoryVeterinarianOption } from '../../components/MedicalHistoryFilters';
import { MedicalHistoryTimeline } from '../../components/MedicalHistoryTimeline';
import { PatientHistorySidebar } from '../../components/PatientHistorySidebar';
import type { MedicalHistoryPeriod, MedicalRecordTypeFilter } from '../../patients.types';
import { filterMedicalRecords } from '../../patients.utils';
import type { PatientDetailOutletContext } from '../../layouts/PatientDetailLayout';

export const PatientHistoryPage = () => {
  const { patient } = useOutletContext<PatientDetailOutletContext>();
  const [period, setPeriod] = useState<MedicalHistoryPeriod>('12m');
  const [recordType, setRecordType] = useState<MedicalRecordTypeFilter>('all');
  const [veterinarianId, setVeterinarianId] = useState('all');
  const veterinarians = patient.medicalRecords.reduce<MedicalHistoryVeterinarianOption[]>(
    (currentVeterinarians, record) => {
      if (currentVeterinarians.some((veterinarian) => veterinarian.id === record.veterinarian.id)) {
        return currentVeterinarians;
      }

      return [...currentVeterinarians, record.veterinarian];
    },
    [],
  );
  const filteredRecords = filterMedicalRecords(patient.medicalRecords, {
    period,
    recordType,
    veterinarianId,
  });

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <MedicalHistoryFilters
        onPeriodChange={setPeriod}
        onRecordTypeChange={setRecordType}
        onVeterinarianChange={setVeterinarianId}
        period={period}
        recordType={recordType}
        veterinarianId={veterinarianId}
        veterinarians={veterinarians}
      />

      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)]">
        <MedicalHistoryTimeline records={filteredRecords} />
        <PatientHistorySidebar patient={patient} />
      </div>
    </div>
  );
};
