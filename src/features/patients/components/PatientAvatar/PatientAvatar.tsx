import type { PatientAvatarProps } from './PatientAvatar.types';

export const PatientAvatar = ({ initials }: PatientAvatarProps) => {
  return (
    <span
      aria-hidden="true"
      className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-semibold text-primary-700"
    >
      {initials}
    </span>
  );
};
