import type { IconType } from 'react-icons';
import { FiActivity, FiClipboard, FiFileText, FiShield } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Badge, Card } from '@/components/ui';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import type { MedicalRecordType } from '../../patients.types';
import type { MedicalHistoryTimelineProps } from './MedicalHistoryTimeline.types';

const recordIcons: Record<MedicalRecordType, IconType> = {
  consultation: FiClipboard,
  vaccination: FiShield,
  checkup: FiActivity,
  procedure: FiFileText,
};

const recordIconClasses: Record<MedicalRecordType, string> = {
  consultation: 'border-primary-500/40 bg-primary-500/10 text-primary-600',
  vaccination: 'border-success/40 bg-success/10 text-success',
  checkup: 'border-warning/40 bg-warning/10 text-warning',
  procedure: 'border-border-strong bg-surface-elevated text-text-secondary',
};

export const MedicalHistoryTimeline = ({ records }: MedicalHistoryTimelineProps) => {
  const { i18n, t } = useTranslation('patients');
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const dateFormatter = new Intl.DateTimeFormat(languageLocales[language], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card className="min-w-0" padding="lg">
      <h2 className="text-base font-semibold text-text-primary">{t('history.records.title')}</h2>

      {records.length > 0 ? (
        <div className="relative mt-5">
          <div
            aria-hidden="true"
            className="absolute bottom-5 left-4 top-5 w-px bg-border-strong"
          />
          <ol className="space-y-5">
            {records.map((record) => {
              const RecordIcon = recordIcons[record.type];

              return (
                <li className="relative pl-11" key={record.id}>
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-4 z-10 flex size-8 items-center justify-center rounded-full border-hairline ${recordIconClasses[record.type]}`}
                  >
                    <RecordIcon className="size-4" />
                  </span>
                  <article className="rounded-lg border-hairline border-border bg-surface-subtle p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          {t(`history.records.titles.${record.title}`)}
                        </h3>
                        <p className="mt-1 text-xs text-text-muted">
                          {t('history.records.metadata', {
                            date: dateFormatter.format(new Date(`${record.date}T00:00:00`)),
                            veterinarian: record.veterinarian.name,
                          })}
                        </p>
                      </div>
                      <Badge variant={record.status === 'completed' ? 'success' : 'warning'}>
                        {t(`history.status.${record.status}`)}
                      </Badge>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {t(`history.records.summaries.${record.summary}`)}
                    </p>

                    {record.attachments?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {record.attachments.map((attachment) => (
                          <li
                            className="inline-flex items-center gap-1.5 rounded-md border-hairline border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-primary-600"
                            key={attachment.id}
                          >
                            <FiFileText aria-hidden="true" className="size-3.5" />
                            {attachment.name}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <div className="py-14 text-center">
          <p className="font-semibold text-text-primary">{t('history.empty.title')}</p>
          <p className="mt-1 text-sm text-text-muted">{t('history.empty.description')}</p>
        </div>
      )}
    </Card>
  );
};
