import { useState } from 'react';
import { FiAlertTriangle, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';

import { Button, Card, Modal } from '@/components/ui';

import { PatientForm } from '../../components/PatientForm';
import { patientDetails, patients } from '../../patients.mock';
import type { PatientDetailItem } from '../../patients.types';
import { getPatientOwnerOptions } from '../../patients.utils';
import type { PatientFormValues } from '../../schemas/patient-form.schema';

const backLinkClassName =
  'inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app-background';

const ownerOptions = getPatientOwnerOptions(patients);

/**
 * Convierte el modelo de detalle al contrato editable de PatientForm.
 * Mantiene fuera del formulario las propiedades clínicas que no pertenecen a esta edición básica.
 */
const patientToFormValues = (patient: PatientDetailItem): PatientFormValues => ({
  birthDate: patient.birthDate,
  breed: patient.breed,
  name: patient.name,
  ownerId: patient.owner.id,
  sex: patient.sex,
  species: patient.species,
  weightKg: patient.weightKg,
});

export const EditPatientPage = () => {
  const navigate = useNavigate();
  const { patientId } = useParams<{ patientId: string }>();
  const { t } = useTranslation('patients');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const patient = patientDetails.find((patientDetail) => patientDetail.id === patientId);

  if (!patient) {
    return (
      <div className="flex min-h-full items-center justify-center p-6 text-text-primary">
        <Card className="w-full max-w-lg text-center" padding="lg">
          <h2 className="text-xl font-semibold text-text-primary">{t('detail.notFound.title')}</h2>
          <p className="mt-2 text-sm text-text-secondary">{t('detail.notFound.description')}</p>
          <Link
            className="mt-6 inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-neutral-0 transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            to="/patients"
          >
            <FiArrowLeft aria-hidden="true" className="size-4" />
            {t('detail.actions.backToPatients')}
          </Link>
        </Card>
      </div>
    );
  }

  const patientPath = `/patients/${patient.id}`;

  /**
   * Valida el flujo de edición sin modificar los mocks ni representar datos como persistidos.
   * La página conservará los valores editados hasta que exista una capa de datos real.
   */
  const handleValidSubmit = () => {
    toast(t('form.editValidated'));
  };

  /**
   * Confirma únicamente la interacción destructiva mientras no exista persistencia.
   * No modifica los mocks ni navega para evitar representar una eliminación inexistente.
   */
  const handleDeletePatient = () => {
    setIsDeleteModalOpen(false);
    toast(t('edit.delete.toast'));
  };

  return (
    <div className="flex min-h-full min-w-0 flex-col gap-4 p-4 text-text-primary sm:p-6">
      <div className="w-full max-w-5xl">
        <Link className={backLinkClassName} to={patientPath}>
          <FiArrowLeft aria-hidden="true" className="size-4" />
          {t('detail.actions.backToPatient')}
        </Link>
      </div>

      <div className="w-full max-w-5xl">
        <PatientForm
          initialValues={patientToFormValues(patient)}
          mode="edit"
          onCancel={() => navigate(patientPath)}
          onSubmit={handleValidSubmit}
          ownerOptions={ownerOptions}
        />
      </div>

      <Card className="w-full max-w-5xl border-danger/30" padding="lg">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-danger/10 text-danger">
              <FiAlertTriangle aria-hidden="true" className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-danger">
                {t('edit.dangerZone.label')}
              </p>
              <h2 className="mt-1 text-base font-semibold text-text-primary">
                {t('edit.dangerZone.title')}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">{t('edit.dangerZone.description')}</p>
            </div>
          </div>

          <Button
            className="shrink-0 self-start sm:self-auto"
            onClick={() => setIsDeleteModalOpen(true)}
            variant="danger"
          >
            <FiTrash2 aria-hidden="true" className="size-4" />
            {t('edit.delete.action')}
          </Button>
        </div>
      </Card>

      <Modal
        description={t('edit.delete.description', { name: patient.name })}
        footer={
          <>
            <Button onClick={() => setIsDeleteModalOpen(false)} variant="secondary">
              {t('edit.delete.cancel')}
            </Button>
            <Button onClick={handleDeletePatient} variant="danger">
              <FiTrash2 aria-hidden="true" className="size-4" />
              {t('edit.delete.confirm')}
            </Button>
          </>
        }
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        showCloseButton={false}
        title={t('edit.delete.title')}
      >
        <div className="flex gap-3 rounded-md border border-danger/30 bg-danger/10 p-4">
          <FiAlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" />
          <p className="text-sm text-text-primary">{t('edit.delete.warning')}</p>
        </div>
      </Modal>
    </div>
  );
};
