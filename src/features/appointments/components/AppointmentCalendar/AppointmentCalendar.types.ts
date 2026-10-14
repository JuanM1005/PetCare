export interface AppointmentCalendarProps {
  datesWithAppointments: readonly string[];
  onDateSelect: (date: string) => void;
  selectedDate: string;
}
