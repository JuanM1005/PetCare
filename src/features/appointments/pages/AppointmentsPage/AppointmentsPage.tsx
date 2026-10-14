import { useState } from 'react';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, Card } from '@/components/ui';
import { patients } from '@/features/patients/patients.mock';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import { appointments, veterinarians } from '../../appointments.mock';
import type { AppointmentFilterState } from '../../appointments.types';
import {
  filterAppointments,
  getAppointmentDisplayItems,
  getAvailableSlots,
  getLocalDate,
  initialAppointmentDate,
} from '../../appointments.utils';
import { AppointmentCalendar } from '../../components/AppointmentCalendar';
import { AppointmentFilters } from '../../components/AppointmentFilters';
import { AppointmentTimeline } from '../../components/AppointmentTimeline';
import { AvailabilityCard } from '../../components/AvailabilityCard';

const initialFilters: AppointmentFilterState = {
  status: 'all',
  type: 'all',
  veterinarianId: 'all',
};

export const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(initialAppointmentDate);
  const [filters, setFilters] = useState<AppointmentFilterState>(initialFilters);
  const { i18n, t } = useTranslation('appointments');
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const dateFormatter = new Intl.DateTimeFormat(languageLocales[language], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const appointmentsForDate = appointments
    .filter((appointment) => appointment.date === selectedDate)
    .toSorted((first, second) => first.startTime.localeCompare(second.startTime));
  const filteredAppointments = filterAppointments(appointmentsForDate, filters);
  const appointmentItems = getAppointmentDisplayItems(
    filteredAppointments,
    patients,
    veterinarians,
  );
  const availableSlots = getAvailableSlots(appointments, selectedDate);
  const datesWithAppointments = [...new Set(appointments.map(({ date }) => date))];
  const selectedDateLabel = dateFormatter.format(getLocalDate(selectedDate));

  return (
    <div className="flex min-h-full min-w-0 flex-col gap-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          aria-label={t('page.selectedDate', { date: selectedDateLabel })}
          className="inline-flex min-h-10 items-center gap-2 rounded-md border-hairline border-border-strong bg-surface px-3 text-sm font-medium text-text-secondary"
        >
          <FiCalendar aria-hidden="true" className="size-4 text-primary-600" />
          <time dateTime={selectedDate}>{selectedDateLabel}</time>
        </div>
        <Button
          onClick={() => navigate(`/appointments/register?date=${selectedDate}`)}
          type="button"
        >
          <FiPlus aria-hidden="true" className="size-4" />
          {t('page.newAppointment')}
        </Button>
      </div>

      <div className="grid min-w-0 flex-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,0.8fr)]">
        <Card className="min-w-0 self-start" padding="lg">
          <AppointmentFilters filters={filters} onChange={setFilters} />
          <div className="my-5 border-t border-border" />
          <AppointmentTimeline
            hasAppointmentsForDate={appointmentsForDate.length > 0}
            items={appointmentItems}
            onClearFilters={() => setFilters(initialFilters)}
          />
        </Card>

        <aside className="grid min-w-0 content-start gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <AvailabilityCard slots={availableSlots} />
          <AppointmentCalendar
            datesWithAppointments={datesWithAppointments}
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
        </aside>
      </div>
    </div>
  );
};
