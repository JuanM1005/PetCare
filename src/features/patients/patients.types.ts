export type Species = 'dog' | 'cat' | 'bird' | 'other';
export type PatientStatus = 'active' | 'inactive';
export type PatientSex = 'male' | 'female';
export type PatientAlertSeverity = 'warning' | 'danger';
export type PatientAlertType = 'penicillinAllergy';
export type PatientAlertDescription = 'avoidPenicillin';
export type PatientMedicationType = 'antiparasitic' | 'chondroprotective';
export type PatientMedicationFrequency = 'monthly' | 'daily';
export type PatientConsultationTitle = 'annualReview';
export type PatientConsultationSummaryText = 'goodGeneralCondition';
export type PatientAppointmentReason = 'generalConsultation';

export type SpeciesFilter = Species | 'all';
export type PatientStatusFilter = PatientStatus | 'all';

export interface PatientListItem {
  birthDate: string;
  breed: string;
  id: string;
  initials: string;
  lastVisit: string | null;
  name: string;
  owner: {
    id: string;
    name: string;
  };
  species: Species;
  status: PatientStatus;
}

export interface PatientAlert {
  description: PatientAlertDescription;
  id: string;
  severity: PatientAlertSeverity;
  title: PatientAlertType;
}

export interface PatientMedicationSummary {
  frequency: PatientMedicationFrequency;
  id: string;
  name: string;
  type: PatientMedicationType;
}

export interface PatientConsultationSummary {
  date: string;
  id: string;
  summary: PatientConsultationSummaryText;
  title: PatientConsultationTitle;
  veterinarianName: string;
}

export interface PatientAppointmentSummary {
  date: string;
  id: string;
  reason: PatientAppointmentReason;
}

export interface PatientDetailItem extends PatientListItem {
  activeMedications: PatientMedicationSummary[];
  alerts: PatientAlert[];
  imageUrl?: string;
  lastConsultation: PatientConsultationSummary | null;
  nextAppointment: PatientAppointmentSummary | null;
  sex: PatientSex;
  weightKg: number;
}
