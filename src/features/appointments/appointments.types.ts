import type { PatientListItem } from '@/features/patients';

export type AppointmentStatus =
  'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export type AppointmentType = 'general_consultation' | 'vaccination' | 'checkup' | 'weight_control';
export type AppointmentDuration = 30 | 60 | 90;

export type AppointmentStatusFilter = AppointmentStatus | 'all';
export type AppointmentTypeFilter = AppointmentType | 'all';

export interface Appointment {
  date: string;
  durationMinutes: AppointmentDuration;
  id: string;
  notes?: string;
  ownerId: string;
  patientId: string;
  startTime: string;
  status: AppointmentStatus;
  type: AppointmentType;
  veterinarianId: string;
}

export interface Veterinarian {
  id: string;
  name: string;
}

export interface AppointmentFilterState {
  status: AppointmentStatusFilter;
  type: AppointmentTypeFilter;
  veterinarianId: string;
}

export interface AppointmentDisplayItem {
  appointment: Appointment;
  patient: PatientListItem;
  veterinarian: Veterinarian;
}

export interface CalendarDay {
  date: Date;
  value: string;
}
