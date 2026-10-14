import type { MedicalHistoryPeriod, MedicalRecordTypeFilter } from '../../patients.types';

export interface MedicalHistoryVeterinarianOption {
  id: string;
  name: string;
}

export interface MedicalHistoryFiltersProps {
  onPeriodChange: (period: MedicalHistoryPeriod) => void;
  onRecordTypeChange: (recordType: MedicalRecordTypeFilter) => void;
  onVeterinarianChange: (veterinarianId: string) => void;
  period: MedicalHistoryPeriod;
  recordType: MedicalRecordTypeFilter;
  veterinarianId: string;
  veterinarians: MedicalHistoryVeterinarianOption[];
}
