import { clsx } from 'clsx';
import { FiAlertTriangle, FiUser } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Badge, Card } from '@/components/ui';

import { getPatientAgeParts } from '../../patients.utils';
import { PatientAvatar } from '../PatientAvatar';
import type { PatientSummaryCardProps } from './PatientSummaryCard.types';

export const PatientSummaryCard = ({ patient }: PatientSummaryCardProps) => {
  const { t } = useTranslation('patients');
  const { months, years } = getPatientAgeParts(patient.birthDate);
  const age = years > 0 ? t('age.years', { count: years }) : t('age.months', { count: months });

  return (
    <Card className="overflow-hidden" padding="none">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.34fr)]">
        <div className="flex min-w-0 flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <PatientAvatar
            imageUrl={patient.imageUrl}
            initials={patient.initials}
            name={patient.name}
            size="lg"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-text-primary">{patient.name}</h2>
              <Badge variant={patient.status === 'active' ? 'success' : 'neutral'}>
                {t(`status.${patient.status}`)}
              </Badge>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 xl:grid-cols-3 2xl:grid-cols-6">
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('detail.labels.species')}
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  {t(`species.${patient.species}`)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('detail.labels.breed')}
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">{patient.breed}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('detail.labels.age')}
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">{age}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('detail.labels.sex')}
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  {t(`detail.sex.${patient.sex}`)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('detail.labels.weight')}
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  {t('detail.weightValue', { value: patient.weightKg })}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-text-muted">
                  {t('detail.labels.owner')}
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary-600">
                  <FiUser aria-hidden="true" className="size-4 shrink-0" />
                  <span className="truncate" title={patient.owner.name}>
                    {patient.owner.name}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {patient.alerts.length > 0 ? (
          <div className="flex flex-col gap-3 border-t border-border p-4 lg:border-l lg:border-t-0">
            {patient.alerts.map((alert) => (
              <div
                className={clsx(
                  'rounded-lg border-hairline p-4',
                  alert.severity === 'danger'
                    ? 'border-danger/30 bg-danger/10'
                    : 'border-warning/30 bg-warning/10',
                )}
                key={alert.id}
              >
                <div
                  className={clsx(
                    'flex items-center gap-2 text-xs font-semibold uppercase',
                    alert.severity === 'danger' ? 'text-danger' : 'text-warning',
                  )}
                >
                  <FiAlertTriangle aria-hidden="true" className="size-4 shrink-0" />
                  {t('detail.medicalAlert')}
                </div>
                <p className="mt-2 text-sm font-semibold text-text-primary">
                  {t(`detail.alerts.titles.${alert.title}`)}
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  {t(`detail.alerts.descriptions.${alert.description}`)}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
};
