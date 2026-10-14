import type { Appointment, Veterinarian } from '../../appointments.types';
import type {
  AppointmentFormInput,
  AppointmentFormValues,
} from '../../schemas/appointment-form.schema';
import type { PatientListItem } from '@/features/patients';

export type AppointmentFormMode = 'create' | 'edit';

export interface AppointmentFormProps {
  appointments: readonly Appointment[];
  initialValues?: Partial<AppointmentFormInput>;
  minimumDate: string;
  mode: AppointmentFormMode;
  onCancel?: () => void;
  onSubmit: (values: AppointmentFormValues) => Promise<void> | void;
  patients: readonly PatientListItem[];
  veterinarians: readonly Veterinarian[];
}
