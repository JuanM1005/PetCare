import { useOutletContext } from 'react-router';

import { PatientSummaryGrid } from '../../components/PatientSummaryGrid';
import type { PatientDetailOutletContext } from '../../layouts/PatientDetailLayout';

export const PatientSummaryPage = () => {
  const { patient } = useOutletContext<PatientDetailOutletContext>();

  return <PatientSummaryGrid patient={patient} />;
};
