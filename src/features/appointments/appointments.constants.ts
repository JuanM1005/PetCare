import type { BadgeVariant } from '@/components/ui';

import type { AppointmentStatus } from './appointments.types';

export const appointmentStatusBadgeVariants: Record<AppointmentStatus, BadgeVariant> = {
  scheduled: 'neutral',
  confirmed: 'success',
  in_progress: 'warning',
  completed: 'success',
  cancelled: 'danger',
};
