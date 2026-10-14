import { useState } from 'react';
import { useOutletContext } from 'react-router';

import { PatientAppointmentsHistory } from '../../components/PatientAppointmentsHistory';
import { UpcomingPatientAppointments } from '../../components/UpcomingPatientAppointments';
import type { PatientDetailOutletContext } from '../../layouts/PatientDetailLayout';
import type { MedicalHistoryPeriod, PatientAppointmentStatusFilter } from '../../patients.types';
import { filterPatientAppointments, groupPatientAppointments } from '../../patients.utils';

export const PatientAppointmentsPage = () => {
  const { patient } = useOutletContext<PatientDetailOutletContext>();
  const [status, setStatus] = useState<PatientAppointmentStatusFilter>('all');
  const [period, setPeriod] = useState<MedicalHistoryPeriod>('12m');
  const { history, upcoming } = groupPatientAppointments(patient.appointments);
  const filteredHistory = filterPatientAppointments(history, { period, status });

  return (
    <div className="flex min-h-full min-w-0 flex-col gap-6">
      <UpcomingPatientAppointments appointments={upcoming} />
      <PatientAppointmentsHistory
        appointments={filteredHistory}
        hasHistory={history.length > 0}
        onPeriodChange={setPeriod}
        onStatusChange={setStatus}
        period={period}
        status={status}
      />
    </div>
  );
};
