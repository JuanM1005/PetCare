export const combineDescribedBy = (...ids: Array<string | undefined>) => {
  const describedBy = ids.filter(Boolean).join(' ');

  return describedBy || undefined;
};

export const fieldLabelClassName = 'text-sm font-medium text-text-primary';

export const fieldHintClassName = 'text-xs text-text-muted';

export const fieldErrorClassName = 'text-xs text-danger';

export const fieldControlClassName =
  'w-full rounded-md border-hairline border-border-strong bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-subtle disabled:text-text-muted';
