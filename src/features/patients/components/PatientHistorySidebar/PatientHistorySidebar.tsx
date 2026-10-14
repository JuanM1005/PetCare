import { clsx } from 'clsx';
import { FiAlertTriangle, FiMinus, FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/ui';
import { getSupportedLanguage, languageLocales } from '@/lib/i18n';

import { getPatientWeightEvolution } from '../../patients.utils';
import { NextAppointmentCard } from '../NextAppointmentCard';
import type { PatientHistorySidebarProps } from './PatientHistorySidebar.types';

export const PatientHistorySidebar = ({ patient }: PatientHistorySidebarProps) => {
  const { i18n, t } = useTranslation('patients');
  const language = getSupportedLanguage(i18n.resolvedLanguage);
  const monthFormatter = new Intl.DateTimeFormat(languageLocales[language], { month: 'short' });
  const numberFormatter = new Intl.NumberFormat(languageLocales[language], {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });
  const weightEvolution = getPatientWeightEvolution(patient.weightHistory);
  const sortedWeights = patient.weightHistory.toSorted((first, second) =>
    first.date.localeCompare(second.date),
  );
  const maximumWeight = Math.max(
    patient.weightKg,
    ...patient.weightHistory.map((record) => record.weightKg),
  );
  const currentWeight = weightEvolution?.current.weightKg ?? patient.weightKg;
  const changeDirection =
    weightEvolution && weightEvolution.changeKg < 0
      ? 'decrease'
      : weightEvolution && weightEvolution.changeKg > 0
        ? 'increase'
        : 'stable';
  const TrendIcon =
    changeDirection === 'increase'
      ? FiTrendingUp
      : changeDirection === 'decrease'
        ? FiTrendingDown
        : FiMinus;

  return (
    <aside className="space-y-4" aria-label={t('history.aside.label')}>
      <Card padding="md">
        <div className="flex items-center gap-2">
          <FiAlertTriangle aria-hidden="true" className="size-5 text-danger" />
          <h2 className="font-semibold text-text-primary">{t('history.alerts.title')}</h2>
        </div>

        {patient.alerts.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {patient.alerts.map((alert) => (
              <li
                className={clsx(
                  'rounded-md border-hairline p-3',
                  alert.severity === 'danger'
                    ? 'border-danger/30 bg-danger/10'
                    : 'border-warning/30 bg-warning/10',
                )}
                key={alert.id}
              >
                <p className="text-sm font-semibold text-text-primary">
                  {t(`detail.alerts.titles.${alert.title}`)}
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  {t(`detail.alerts.descriptions.${alert.description}`)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-text-muted">{t('history.alerts.empty')}</p>
        )}
      </Card>

      <NextAppointmentCard appointment={patient.nextAppointment} />

      <Card padding="md">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-text-primary">{t('history.weight.title')}</h2>
          <TrendIcon aria-hidden="true" className="size-5 text-primary-600" />
        </div>

        <p className="mt-4 text-xs font-semibold uppercase text-text-muted">
          {t('history.weight.current')}
        </p>
        <p className="mt-1 text-2xl font-semibold text-text-primary">
          {t('detail.weightValue', { value: numberFormatter.format(currentWeight) })}
        </p>

        {weightEvolution ? (
          <p className="mt-2 text-xs font-medium text-primary-600">
            {t(`history.weight.change.${changeDirection}`, {
              month: monthFormatter.format(new Date(`${weightEvolution.previous.date}T00:00:00`)),
              value: numberFormatter.format(Math.abs(weightEvolution.changeKg)),
            })}
          </p>
        ) : null}

        <ul className="mt-5 space-y-3">
          {sortedWeights.map((record) => (
            <li className="flex items-center gap-3" key={record.id}>
              <span className="w-9 text-xs font-medium capitalize text-text-muted">
                {monthFormatter.format(new Date(`${record.date}T00:00:00`))}
              </span>
              <span aria-hidden="true" className="h-1.5 flex-1 rounded-full bg-primary-500/20">
                <span
                  className="block h-full rounded-full bg-primary-500"
                  style={{ width: `${(record.weightKg / maximumWeight) * 100}%` }}
                />
              </span>
              <span className="text-xs font-semibold text-text-secondary">
                {t('detail.weightValue', { value: numberFormatter.format(record.weightKg) })}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
};
