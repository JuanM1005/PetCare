import { FiArrowLeft } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

import type { SelectOption } from '@/components/ui';

import { PatientForm } from '../../components/PatientForm';
import { patients } from '../../patients.mock';

const backLinkClassName =
  'inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app-background';

const ownerOptions = patients.reduce<SelectOption[]>((options, patient) => {
  if (options.some((option) => option.value === patient.owner.id)) {
    return options;
  }

  return [...options, { label: patient.owner.name, value: patient.owner.id }];
}, []);

export const RegisterPatientPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('patients');

  /**
   * Confirma temporalmente que el contrato recibió datos válidos sin representar persistencia.
   * No modifica mocks, limpia el formulario ni navega mientras no exista una capa de datos real.
   */
  const handleValidSubmit = () => {
    toast(t('form.submitValidated'));
  };

  return (
    <div className="flex min-h-full min-w-0 flex-col gap-4 p-4 text-text-primary sm:p-6">
      <div className="w-full max-w-5xl">
        <Link className={backLinkClassName} to="/patients">
          <FiArrowLeft aria-hidden="true" className="size-4" />
          {t('detail.actions.backToPatients')}
        </Link>
      </div>

      <div className="w-full max-w-5xl">
        <PatientForm
          mode="create"
          onCancel={() => navigate('/patients')}
          onSubmit={handleValidSubmit}
          ownerOptions={ownerOptions}
        />
      </div>
    </div>
  );
};
