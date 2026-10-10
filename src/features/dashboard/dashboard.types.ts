export type AppointmentStatus = 'scheduled' | 'confirmed' | 'pending';
export type DashboardAvatarTone = 'primary' | 'neutral' | 'warning';
export type DashboardMetricIcon = 'calendar' | 'completed' | 'pending' | 'availability';
export type DashboardMetricVariant = 'default' | 'primary';
export type DashboardSupportingTone = 'success' | 'warning';

export interface DashboardAppointment {
  avatarTone: DashboardAvatarTone;
  id: string;
  initials: string;
  patientName: string;
  reason: string;
  species: string;
  status: AppointmentStatus;
  time: string;
}

export interface DashboardMetric {
  actionLabel?: string;
  actionTo?: string;
  icon: DashboardMetricIcon;
  id: string;
  label: string;
  progress?: number;
  supportingText?: string;
  supportingTone?: DashboardSupportingTone;
  unit?: string;
  value: number | string;
  variant?: DashboardMetricVariant;
}

export interface DashboardRecentPatient {
  avatarTone: DashboardAvatarTone;
  breed: string;
  id: string;
  initials: string;
  name: string;
  species: string;
}
