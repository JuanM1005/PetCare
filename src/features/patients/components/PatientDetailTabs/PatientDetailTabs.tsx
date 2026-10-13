import { useTranslation } from 'react-i18next';

export const PatientDetailTabs = () => {
  const { t } = useTranslation('patients');

  return (
    <div
      aria-label={t('detail.tabs.label')}
      className="overflow-x-auto border-b border-border"
      role="tablist"
    >
      <div className="flex min-w-max gap-6">
        <button
          aria-selected="true"
          className="border-b-2 border-primary-500 px-1 py-3 text-sm font-semibold text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          role="tab"
          type="button"
        >
          {t('detail.tabs.summary')}
        </button>
        <button
          aria-disabled="true"
          aria-selected="false"
          className="cursor-not-allowed border-b-2 border-transparent px-1 py-3 text-sm font-medium text-text-muted opacity-60"
          disabled
          role="tab"
          type="button"
        >
          {t('detail.tabs.history')}
        </button>
        <button
          aria-disabled="true"
          aria-selected="false"
          className="cursor-not-allowed border-b-2 border-transparent px-1 py-3 text-sm font-medium text-text-muted opacity-60"
          disabled
          role="tab"
          type="button"
        >
          {t('detail.tabs.appointments')}
        </button>
      </div>
    </div>
  );
};
