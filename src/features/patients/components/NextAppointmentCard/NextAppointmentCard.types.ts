import type { PatientAppointmentSummary } from '../../patients.types';

export interface NextAppointmentCardProps {
  appointment: PatientAppointmentSummary | null;
  className?: string;
}
