import type { AppointmentFilterState } from '../../appointments.types';

export interface AppointmentFiltersProps {
  filters: AppointmentFilterState;
  onChange: (filters: AppointmentFilterState) => void;
}
