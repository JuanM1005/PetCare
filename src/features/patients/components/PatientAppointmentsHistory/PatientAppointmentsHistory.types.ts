import type {
  MedicalHistoryPeriod,
  PatientAppointment,
  PatientAppointmentStatusFilter,
} from '../../patients.types';

export interface PatientAppointmentsHistoryProps {
  appointments: PatientAppointment[];
  hasHistory: boolean;
  onPeriodChange: (period: MedicalHistoryPeriod) => void;
  onStatusChange: (status: PatientAppointmentStatusFilter) => void;
  period: MedicalHistoryPeriod;
  status: PatientAppointmentStatusFilter;
}
