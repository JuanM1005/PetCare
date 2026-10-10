export type AppointmentStatus = 'scheduled' | 'confirmed' | 'pending';
export type AppointmentReason = 'general' | 'vaccination' | 'postoperative' | 'weight';
export type DashboardAvatarTone = 'primary' | 'neutral' | 'warning';
export type DashboardMetricIcon = 'calendar' | 'completed' | 'pending' | 'availability';
export type DashboardMetricId =
  'today-appointments' | 'completed-appointments' | 'pending-appointments' | 'availability';
export type DashboardSpecies = 'dog' | 'cat' | 'bird';
export type DashboardBreed = 'goldenRetriever' | 'siamese' | 'parrot';

export interface DashboardAppointment {
  avatarTone: DashboardAvatarTone;
  id: string;
  initials: string;
  patientName: string;
  reason: AppointmentReason;
  species: DashboardSpecies;
  status: AppointmentStatus;
  time: string;
}

export interface DashboardMetric {
  actionTo?: string;
  icon: DashboardMetricIcon;
  id: DashboardMetricId;
  progress?: number;
  value: number | string;
}

export interface DashboardRecentPatient {
  avatarTone: DashboardAvatarTone;
  breed: DashboardBreed;
  id: string;
  initials: string;
  name: string;
  species: DashboardSpecies;
}
