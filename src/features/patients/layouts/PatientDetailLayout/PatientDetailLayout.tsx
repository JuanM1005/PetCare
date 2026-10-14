import { FiArrowLeft, FiCalendar, FiEdit3, FiPlus } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useParams } from 'react-router';

import { Button, Card } from '@/components/ui';

import { PatientDetailTabs } from '../../components/PatientDetailTabs';
import { PatientSummaryCard } from '../../components/PatientSummaryCard';
import { patientDetails } from '../../patients.mock';
import type { PatientDetailOutletContext } from './PatientDetailLayout.types';

const backLinkClassName =
  'inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app-background';

export const PatientDetailLayout = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const { t } = useTranslation('patients');
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

  const outletContext: PatientDetailOutletContext = { patient };

  return (
    <div className="flex min-h-full min-w-0 flex-col gap-4 p-4 text-text-primary sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link className={backLinkClassName} to="/patients">
          <FiArrowLeft aria-hidden="true" className="size-4" />
          {t('detail.actions.backToPatients')}
        </Link>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <Button disabled title={t('actions.availableSoon')} variant="secondary">
            <FiEdit3 aria-hidden="true" className="size-4" />
            {t('detail.actions.edit')}
          </Button>
          <Button disabled title={t('actions.availableSoon')} variant="secondary">
            <FiCalendar aria-hidden="true" className="size-4" />
            {t('detail.actions.scheduleAppointment')}
          </Button>
          <Button disabled title={t('actions.availableSoon')}>
            <FiPlus aria-hidden="true" className="size-4" />
            {t('detail.actions.newConsultation')}
          </Button>
        </div>
      </div>

      <PatientSummaryCard patient={patient} />
      <PatientDetailTabs patientId={patient.id} />
      <Outlet context={outletContext} />
    </div>
  );
};
