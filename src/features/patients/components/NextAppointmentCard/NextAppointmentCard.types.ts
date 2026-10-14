import type { PatientAppointment } from '../../patients.types';

export interface NextAppointmentCardProps {
  appointment: PatientAppointment | null;
  className?: string;
}
