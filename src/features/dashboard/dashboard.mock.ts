import type {
  DashboardAppointment,
  DashboardMetric,
  DashboardRecentPatient,
} from './dashboard.types';

export const dashboardMetrics = [
  {
    icon: 'calendar',
    id: 'today-appointments',
    value: 12,
  },
  {
    icon: 'completed',
    id: 'completed-appointments',
    progress: 40,
    value: 5,
  },
  {
    icon: 'pending',
    id: 'pending-appointments',
    value: 6,
  },
  {
    actionTo: '/appointments',
    icon: 'availability',
    id: 'availability',
    value: 4,
  },
] satisfies readonly DashboardMetric[];

export const upcomingAppointments = [
  {
    avatarTone: 'primary',
    id: 'appointment-luna',
    initials: 'LU',
    patientName: 'Luna',
    reason: 'general',
    species: 'dog',
    status: 'scheduled',
    time: '09:30',
  },
  {
    avatarTone: 'neutral',
    id: 'appointment-rocky',
    initials: 'RO',
    patientName: 'Rocky',
    reason: 'vaccination',
    species: 'dog',
    status: 'confirmed',
    time: '10:15',
  },
  {
    avatarTone: 'warning',
    id: 'appointment-milo',
    initials: 'MI',
    patientName: 'Milo',
    reason: 'postoperative',
    species: 'cat',
    status: 'pending',
    time: '11:00',
  },
  {
    avatarTone: 'neutral',
    id: 'appointment-nala',
    initials: 'NA',
    patientName: 'Nala',
    reason: 'weight',
    species: 'cat',
    status: 'scheduled',
    time: '12:30',
  },
] satisfies readonly DashboardAppointment[];

export const recentPatients = [
  {
    avatarTone: 'primary',
    breed: 'goldenRetriever',
    id: 'patient-luna',
    initials: 'LU',
    name: 'Luna',
    species: 'dog',
  },
  {
    avatarTone: 'warning',
    breed: 'siamese',
    id: 'patient-milo',
    initials: 'MI',
    name: 'Milo',
    species: 'cat',
  },
  {
    avatarTone: 'neutral',
    breed: 'parrot',
    id: 'patient-coco',
    initials: 'CO',
    name: 'Coco',
    species: 'bird',
  },
] satisfies readonly DashboardRecentPatient[];
