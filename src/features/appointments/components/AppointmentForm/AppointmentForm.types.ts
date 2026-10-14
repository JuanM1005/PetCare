import type { Appointment, Veterinarian } from '../../appointments.types';
import type { AppointmentFormValues } from '../../schemas/appointment-form.schema';
import type { PatientListItem } from '@/features/patients';

export type AppointmentFormMode = 'create' | 'edit';

export interface AppointmentFormProps {
  appointments: readonly Appointment[];
  excludeAppointmentId?: string;
  initialValues?: Partial<AppointmentFormValues>;
  minimumDate: string;
  mode: AppointmentFormMode;
  onCancel?: () => void;
  onSubmit: (values: AppointmentFormValues) => Promise<void> | void;
  patients: readonly PatientListItem[];
  veterinarians: readonly Veterinarian[];
}
