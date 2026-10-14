import { FiArrowLeft } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';

import { patients } from '@/features/patients/patients.mock';

import { appointments, veterinarians } from '../../appointments.mock';
import type { Appointment } from '../../appointments.types';
import { getDateValue } from '../../appointments.utils';
import { AppointmentForm } from '../../components/AppointmentForm';
import { AppointmentNotFound } from '../../components/AppointmentNotFound';
import type { AppointmentFormValues } from '../../schemas/appointment-form.schema';

const backLinkClassName =
  'inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app-background';

/**
 * Convierte una cita al contrato editable de AppointmentForm.
 * Mantiene fuera del formulario el identificador y el estado clínico de la cita.
 */
const appointmentToFormValues = (appointment: Appointment): AppointmentFormValues => ({
  date: appointment.date,
  durationMinutes: appointment.durationMinutes,
  notes: appointment.notes ?? '',
  patientId: appointment.patientId,
  startTime: appointment.startTime,
  type: appointment.type,
  veterinarianId: appointment.veterinarianId,
});

export const EditAppointmentPage = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { t } = useTranslation('appointments');
  const appointment = appointments.find(({ id }) => id === appointmentId);

  if (!appointment) {
    return <AppointmentNotFound />;
  }

  const appointmentPath = `/appointments/${appointment.id}`;
  const today = getDateValue(new Date());
  const minimumDate = appointment.date < today ? appointment.date : today;

  /**
   * Confirma que la edición entregó datos válidos sin modificar los mocks.
   * La página permanece abierta hasta integrar una capa real de persistencia.
   */
  const handleValidSubmit = () => {
    toast(t('edit.submitValidated'));
  };

  return (
    <div className="flex min-h-full min-w-0 flex-col gap-5 p-4 text-text-primary sm:p-6">
      <div>
        <Link className={backLinkClassName} to={appointmentPath}>
          <FiArrowLeft aria-hidden="true" className="size-4" />
          {t('edit.back')}
        </Link>
        <h2 className="mt-4 text-2xl font-semibold text-text-primary">{t('edit.title')}</h2>
        <p className="mt-1 text-sm text-text-secondary">{t('edit.description')}</p>
      </div>

      <AppointmentForm
        appointments={appointments}
        excludeAppointmentId={appointment.id}
        initialValues={appointmentToFormValues(appointment)}
        minimumDate={minimumDate}
        mode="edit"
        onCancel={() => navigate(appointmentPath)}
        onSubmit={handleValidSubmit}
        patients={patients}
        veterinarians={veterinarians}
      />
    </div>
  );
};
