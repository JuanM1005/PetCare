import type { SelectOption } from '@/components/ui';

import type { PatientFormValues } from '../../schemas/patient-form.schema';

export type PatientFormMode = 'create' | 'edit';

export interface PatientFormProps {
  initialValues?: PatientFormValues;
  mode: PatientFormMode;
  onCancel?: () => void;
  onSubmit: (values: PatientFormValues) => Promise<void> | void;
  ownerOptions: readonly SelectOption[];
}
