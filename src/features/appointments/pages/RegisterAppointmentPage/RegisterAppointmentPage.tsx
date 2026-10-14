import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router';

import { patients } from '@/features/patients/patients.mock';

import { appointments, veterinarians } from '../../appointments.mock';
import { getDateValue, getInitialRegisterDate } from '../../appointments.utils';
import { AppointmentForm } from '../../components/AppointmentForm';
import type { AppointmentFormValues } from '../../schemas/appointment-form.schema';

export const RegisterAppointmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation('appointments');
  const minimumDate = getDateValue(new Date());
  const requestedPatientId = searchParams.get('patientId');
  const selectedPatient = patients.find(({ id }) => id === requestedPatientId);
  const initialValues: Partial<AppointmentFormValues> = {
    date: getInitialRegisterDate(searchParams.get('date'), minimumDate),
    patientId: selectedPatient?.id ?? '',
  };
  const cancelPath = selectedPatient ? `/patients/${selectedPatient.id}` : '/appointments';

  /**
   * Confirma que el formulario entregó un contrato válido sin representar una cita persistida.
   * Los mocks no se modifican y la pantalla permanece abierta hasta integrar una capa de datos real.
   */
  const handleValidSubmit = () => {
    toast(t('register.submitValidated'));
  };

  return (
    <div className="flex min-h-full min-w-0 flex-col gap-5 p-4 text-text-primary sm:p-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">{t('register.title')}</h2>
        <p className="mt-1 text-sm text-text-secondary">{t('register.description')}</p>
      </div>

      <AppointmentForm
        appointments={appointments}
        initialValues={initialValues}
        minimumDate={minimumDate}
        mode="create"
        onCancel={() => navigate(cancelPath)}
        onSubmit={handleValidSubmit}
        patients={patients}
        veterinarians={veterinarians}
      />
    </div>
  );
};
