export interface TimeSlotPickerProps {
  availableSlots: readonly string[];
  disabled?: boolean;
  error?: string;
  hasVeterinarian: boolean;
  onSelect: (time: string) => void;
  selectedTime: string;
  slots: readonly string[];
}
