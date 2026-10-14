export interface AppointmentCalendarProps {
  datesWithAppointments?: readonly string[];
  isDateDisabled?: (date: string) => boolean;
  onDateSelect: (date: string) => void;
  selectedDate: string;
}
