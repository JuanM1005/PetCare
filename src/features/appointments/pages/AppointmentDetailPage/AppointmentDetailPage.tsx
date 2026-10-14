import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiEdit3,
  FiExternalLink,
  FiFileText,
  FiUser,
  FiXCircle,
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

import { Badge, Button, Card } from '@/components/ui';
import { PatientAvatar } from '@/features/patients/components/PatientAvatar';
import { patients } from '@/features/patients/patients.mock';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import { appointmentStatusBadgeVariants } from '../../appointments.constants';
import { appointments, veterinarians } from '../../appointments.mock';
import { getAppointmentEndTime, getLocalDate } from '../../appointments.utils';

const backLinkClassName =
  'inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app-background';
const patientLinkClassName =
  'inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface';

export const AppointmentDetailPage = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { i18n, t } = useTranslation(['appointments', 'patients']);
  const appointment = appointments.find(({ id }) => id === appointmentId);

  if (!appointment) {
    return (
      <div className="flex min-h-full items-center justify-center p-6 text-text-primary">
        <Card className="w-full max-w-lg text-center" padding="lg">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
            <FiCalendar aria-hidden="true" className="size-6" />
          </span>
          <h2 className="mt-4 text-xl font-semibold text-text-primary">
            {t('appointments:detail.notFound.title')}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {t('appointments:detail.notFound.description')}
          </p>
          <Link
            className="mt-6 inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-primary-action px-4 py-2 text-sm font-medium text-neutral-0 transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            to="/appointments"
          >
            <FiArrowLeft aria-hidden="true" className="size-4" />
            {t('appointments:detail.back')}
          </Link>
        </Card>
      </div>
    );
  }

  const patient = patients.find(({ id }) => id === appointment.patientId);
  const veterinarian = veterinarians.find(({ id }) => id === appointment.veterinarianId);
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const formattedDate = new Intl.DateTimeFormat(languageLocales[language], {
    dateStyle: 'long',
  }).format(getLocalDate(appointment.date));
  const endTime = getAppointmentEndTime(appointment.startTime, appointment.durationMinutes);

  return (
    <div className="flex min-h-full min-w-0 flex-col gap-5 p-4 text-text-primary sm:p-6">
      <Link className={backLinkClassName} to="/appointments">
        <FiArrowLeft aria-hidden="true" className="size-4" />
        {t('appointments:detail.back')}
      </Link>

      <section
        className="flex flex-wrap items-start justify-between gap-4"
        aria-labelledby="appointment-detail-title"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold text-text-primary" id="appointment-detail-title">
              {t(`appointments:types.${appointment.type}`)}
            </h2>
            <Badge variant={appointmentStatusBadgeVariants[appointment.status]}>
              {t(`appointments:statuses.${appointment.status}`)}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            <time dateTime={`${appointment.date}T${appointment.startTime}`}>
              {formattedDate} · {appointment.startTime}
            </time>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            disabled
            title={t('appointments:detail.actions.availableSoon')}
            variant="secondary"
          >
            <FiEdit3 aria-hidden="true" className="size-4" />
            {t('appointments:detail.actions.edit')}
          </Button>
          <Button disabled title={t('appointments:detail.actions.availableSoon')} variant="danger">
            <FiXCircle aria-hidden="true" className="size-4" />
            {t('appointments:detail.actions.cancel')}
          </Button>
        </div>
      </section>

      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <Card padding="lg">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary">
              <FiCalendar aria-hidden="true" className="size-5 text-primary-600" />
              {t('appointments:detail.schedule.title')}
            </h3>
            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('appointments:detail.schedule.date')}
                </dt>
                <dd className="mt-1 font-medium text-text-primary">
                  <time dateTime={appointment.date}>{formattedDate}</time>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('appointments:detail.schedule.time')}
                </dt>
                <dd className="mt-1 inline-flex items-center gap-2 font-medium text-text-primary">
                  <FiClock aria-hidden="true" className="size-4 text-primary-600" />
                  <time dateTime={`${appointment.date}T${appointment.startTime}`}>
                    {appointment.startTime}
                  </time>
                  <span aria-hidden="true">–</span>
                  <time dateTime={`${appointment.date}T${endTime}`}>{endTime}</time>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('appointments:detail.schedule.duration')}
                </dt>
                <dd className="mt-1 font-medium text-text-primary">
                  {t('appointments:card.duration', { count: appointment.durationMinutes })}
                </dd>
              </div>
            </dl>
          </Card>

          <Card padding="lg">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary">
              <FiFileText aria-hidden="true" className="size-5 text-primary-600" />
              {t('appointments:detail.details.title')}
            </h3>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('appointments:detail.details.reason')}
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  {t(`appointments:types.${appointment.type}`)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('appointments:detail.details.veterinarian')}
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  {veterinarian?.name ?? t('appointments:detail.details.veterinarianUnavailable')}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('appointments:detail.details.notes')}
                </dt>
                <dd className="mt-2 whitespace-pre-wrap rounded-md bg-surface-subtle p-4 text-sm leading-relaxed text-text-secondary">
                  {appointment.notes || t('appointments:detail.details.noNotes')}
                </dd>
              </div>
            </dl>
          </Card>
        </div>

        <aside className="min-w-0 self-start">
          <Card padding="lg">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-text-primary">
              <FiUser aria-hidden="true" className="size-5 text-primary-600" />
              {t('appointments:detail.patient.title')}
            </h3>

            {patient ? (
              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <PatientAvatar initials={patient.initials} name={patient.name} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-text-primary">{patient.name}</p>
                    <p className="truncate text-sm text-text-secondary">
                      {t(`patients:species.${patient.species}`)} · {patient.breed}
                    </p>
                  </div>
                </div>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase text-text-muted">
                    {t('appointments:detail.patient.owner')}
                  </p>
                  <p className="mt-1 text-sm font-medium text-text-primary">{patient.owner.name}</p>
                </div>
                <Link className={`${patientLinkClassName} mt-5`} to={`/patients/${patient.id}`}>
                  {t('appointments:detail.patient.viewRecord')}
                  <FiExternalLink aria-hidden="true" className="size-4" />
                </Link>
              </div>
            ) : (
              <p className="mt-5 rounded-md bg-surface-subtle p-4 text-sm text-text-secondary">
                {t('appointments:detail.patient.unavailable')}
              </p>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
};
