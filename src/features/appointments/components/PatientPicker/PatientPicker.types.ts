import type { PatientListItem } from '@/features/patients';

export interface PatientPickerProps {
  disabled?: boolean;
  error?: string;
  onChange: (patientId: string) => void;
  patients: readonly PatientListItem[];
  value: string;
}
