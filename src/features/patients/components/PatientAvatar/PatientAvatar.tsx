import { clsx } from 'clsx';

import type { PatientAvatarProps } from './PatientAvatar.types';

const sizeClasses: Record<NonNullable<PatientAvatarProps['size']>, string> = {
  sm: 'size-10 text-sm',
  lg: 'size-24 text-xl sm:size-28',
};

export const PatientAvatar = ({ imageUrl, initials, name, size = 'sm' }: PatientAvatarProps) => {
  if (imageUrl) {
    return (
      <img
        alt={name}
        className={clsx('shrink-0 rounded-lg object-cover', sizeClasses[size])}
        src={imageUrl}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={clsx(
        'flex shrink-0 items-center justify-center rounded-lg bg-primary-500/10 font-semibold text-primary-700',
        sizeClasses[size],
      )}
    >
      {initials}
    </span>
  );
};
