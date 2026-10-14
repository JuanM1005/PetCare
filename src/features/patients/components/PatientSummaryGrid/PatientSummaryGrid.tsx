import { useMemo } from 'react';
import { FiActivity, FiClock, FiFileText } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Button, Card } from '@/components/ui';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import type { PatientSummaryGridProps } from './PatientSummaryGrid.types';
import { NextAppointmentCard } from '../NextAppointmentCard';

export const PatientSummaryGrid = ({ patient }: PatientSummaryGridProps) => {
  const { i18n, t } = useTranslation('patients');
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(languageLocales[language], {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    [language],
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card className="flex min-h-64 flex-col" padding="md">
        <div className="flex items-center gap-2">
          <FiClock aria-hidden="true" className="size-5 text-primary-600" />
          <h3 className="font-semibold text-text-primary">
            {t('detail.sections.lastConsultation')}
          </h3>
        </div>

        {patient.lastConsultation ? (
          <div className="mt-4 flex flex-1 flex-col">
            <p className="text-xs font-medium text-text-muted">
              {t('detail.consultation.metadata', {
                date: dateFormatter.format(new Date(`${patient.lastConsultation.date}T00:00:00`)),
                veterinarian: patient.lastConsultation.veterinarianName,
              })}
            </p>
            <p className="mt-3 text-sm font-semibold text-text-primary">
              {t(`detail.consultation.titles.${patient.lastConsultation.title}`)}
            </p>
            <div className="mt-3 rounded-md border-hairline border-border bg-surface-subtle p-3">
              <p className="text-sm leading-relaxed text-text-secondary">
                {t(`detail.consultation.summaries.${patient.lastConsultation.summary}`)}
              </p>
            </div>
            <Button
              className="mt-auto self-start px-0"
              disabled
              size="sm"
              title={t('actions.availableSoon')}
              variant="ghost"
            >
              {t('detail.actions.viewFullReport')}
            </Button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-text-muted">{t('detail.consultation.empty')}</p>
        )}
      </Card>

      <NextAppointmentCard appointment={patient.nextAppointment} className="min-h-64" />

      <Card className="flex min-h-64 flex-col md:col-span-2 xl:col-span-1" padding="md">
        <div className="flex items-center gap-2">
          <FiActivity aria-hidden="true" className="size-5 text-warning" />
          <h3 className="font-semibold text-text-primary">
            {t('detail.sections.activeMedication')}
          </h3>
        </div>

        {patient.activeMedications.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {patient.activeMedications.map((medication) => (
              <li
                className="flex items-center gap-3 rounded-md border-hairline border-border bg-surface-subtle p-3"
                key={medication.id}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-surface text-text-secondary">
                  <FiFileText aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {medication.name}
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {t('detail.medication.description', {
                      frequency: t(`detail.medication.frequencies.${medication.frequency}`),
                      type: t(`detail.medication.types.${medication.type}`),
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-text-muted">{t('detail.medication.empty')}</p>
        )}
      </Card>
    </div>
  );
};
