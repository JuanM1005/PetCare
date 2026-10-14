import { clsx } from 'clsx';
import { FiCheck, FiInfo } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/ui';
import { useAccentContext } from '@/context/accent';
import { ACCENTS } from '@/lib/accent';
import type { Accent } from '@/lib/accent';

const swatchClassNames: Record<Accent, string> = {
  blue: 'bg-accent-blue',
  teal: 'bg-accent-teal',
  indigo: 'bg-accent-indigo',
  violet: 'bg-accent-violet',
};

export const AccentPicker = () => {
  const { accent, setAccent } = useAccentContext();
  const { t } = useTranslation('settings');

  return (
    <Card padding="lg">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold text-text-primary">{t('appearance.title')}</h2>
        <p className="mt-1 text-sm text-text-secondary">{t('appearance.description')}</p>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-text-primary">
          {t('appearance.interfaceColor')}
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {ACCENTS.map((option) => {
            const isSelected = accent === option;
            const label = t(`appearance.accents.${option}`);

            return (
              <label
                className={clsx(
                  'flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border-hairline px-4 py-3 transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:ring-offset-surface motion-reduce:transition-none',
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-border-strong bg-surface hover:bg-surface-hover',
                )}
                key={option}
              >
                <input
                  aria-label={t('appearance.selectAccent', { accent: label })}
                  checked={isSelected}
                  className="sr-only"
                  name="petcare-accent"
                  onChange={() => setAccent(option)}
                  type="radio"
                  value={option}
                />
                <span
                  aria-hidden="true"
                  className={clsx(
                    'size-6 shrink-0 rounded-full ring-1 ring-neutral-900/10',
                    swatchClassNames[option],
                  )}
                />
                <span
                  className={clsx(
                    'min-w-0 flex-1 text-sm font-medium',
                    isSelected ? 'text-primary-700' : 'text-text-primary',
                  )}
                >
                  {label}
                </span>
                <FiCheck
                  aria-hidden="true"
                  className={clsx(
                    'size-5 shrink-0 text-primary-600',
                    isSelected ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5 flex gap-3 rounded-md border-hairline border-border bg-surface-subtle p-4">
        <FiInfo aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary-600" />
        <p className="text-sm text-text-secondary">{t('appearance.explanation')}</p>
      </div>
    </Card>
  );
};
