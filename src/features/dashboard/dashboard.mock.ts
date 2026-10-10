import type {
  DashboardAppointment,
  DashboardMetric,
  DashboardRecentPatient,
} from './dashboard.types';

export const dashboardMetrics = [
  {
    icon: 'calendar',
    id: 'today-appointments',
    label: 'Citas de hoy',
    supportingText: '+2 vs ayer',
    supportingTone: 'success',
    value: 12,
  },
  {
    icon: 'completed',
    id: 'completed-appointments',
    label: 'Atendidas',
    progress: 40,
    value: 5,
  },
  {
    icon: 'pending',
    id: 'pending-appointments',
    label: 'Pendientes',
    supportingText: 'Siguiente en 15 min',
    supportingTone: 'warning',
    value: 6,
  },
  {
    actionLabel: 'Ver calendario →',
    actionTo: '/appointments',
    icon: 'availability',
    id: 'availability',
    label: 'Disponibilidad',
    unit: 'espacios',
    value: 4,
    variant: 'primary',
  },
] satisfies readonly DashboardMetric[];

export const upcomingAppointments = [
  {
    avatarTone: 'primary',
    id: 'appointment-luna',
    initials: 'LU',
    patientName: 'Luna',
    reason: 'Consulta general',
    species: 'Perro',
    status: 'scheduled',
    time: '09:30',
  },
  {
    avatarTone: 'neutral',
    id: 'appointment-rocky',
    initials: 'RO',
    patientName: 'Rocky',
    reason: 'Vacunación',
    species: 'Perro',
    status: 'confirmed',
    time: '10:15',
  },
  {
    avatarTone: 'warning',
    id: 'appointment-milo',
    initials: 'MI',
    patientName: 'Milo',
    reason: 'Revisión postoperatoria',
    species: 'Gato',
    status: 'pending',
    time: '11:00',
  },
  {
    avatarTone: 'neutral',
    id: 'appointment-nala',
    initials: 'NA',
    patientName: 'Nala',
    reason: 'Control de peso',
    species: 'Gato',
    status: 'scheduled',
    time: '12:30',
  },
] satisfies readonly DashboardAppointment[];

export const recentPatients = [
  {
    avatarTone: 'primary',
    breed: 'Golden Retriever',
    id: 'patient-luna',
    initials: 'LU',
    name: 'Luna',
    species: 'Perro',
  },
  {
    avatarTone: 'warning',
    breed: 'Siamés',
    id: 'patient-milo',
    initials: 'MI',
    name: 'Milo',
    species: 'Gato',
  },
  {
    avatarTone: 'neutral',
    breed: 'Loro',
    id: 'patient-coco',
    initials: 'CO',
    name: 'Coco',
    species: 'Pájaro',
  },
] satisfies readonly DashboardRecentPatient[];
