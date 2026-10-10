export const combineDescribedBy = (...ids: Array<string | undefined>) => {
  const describedBy = ids.filter(Boolean).join(' ');

  return describedBy || undefined;
};

export const fieldLabelClassName = 'text-sm font-medium text-neutral-900';

export const fieldHintClassName = 'text-xs text-neutral-500';

export const fieldErrorClassName = 'text-xs text-danger';

export const fieldControlClassName =
  'w-full rounded-md border-hairline border-neutral-300 bg-neutral-0 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-500';
