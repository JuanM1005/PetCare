import type { AppointmentDisplayItem } from '../../appointments.types';

export interface AppointmentTimelineProps {
  hasAppointmentsForDate: boolean;
  items: AppointmentDisplayItem[];
  onClearFilters: () => void;
}
