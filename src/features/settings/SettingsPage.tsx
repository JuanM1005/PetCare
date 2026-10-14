import { AccentPicker } from './components/AccentPicker';

export const SettingsPage = () => {
  return (
    <div className="flex min-h-full min-w-0 flex-col p-4 text-text-primary sm:p-6">
      <div className="w-full max-w-4xl">
        <AccentPicker />
      </div>
    </div>
  );
};
