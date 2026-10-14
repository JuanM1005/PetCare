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
export type MedicalRecordType = 'consultation' | 'vaccination' | 'checkup' | 'procedure';
export type MedicalRecordStatus = 'completed' | 'pending';
export type MedicalRecordTitle =
  'generalConsultation' | 'annualVaccination' | 'weightCheck' | 'dentalProcedure';
export type MedicalRecordSummary =
  'generalConsultation' | 'annualVaccination' | 'weightCheck' | 'dentalProcedure';
export type MedicalHistoryPeriod = '3m' | '6m' | '12m' | 'all';
export type MedicalRecordTypeFilter = MedicalRecordType | 'all';

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

export interface PatientMedicalAttachment {
  id: string;
  name: string;
}

export interface PatientMedicalRecord {
  attachments?: PatientMedicalAttachment[];
  date: string;
  id: string;
  status: MedicalRecordStatus;
  summary: MedicalRecordSummary;
  title: MedicalRecordTitle;
  type: MedicalRecordType;
  veterinarian: {
    id: string;
    name: string;
  };
}

export interface PatientWeightRecord {
  date: string;
  id: string;
  weightKg: number;
}

export interface MedicalHistoryFilterState {
  period: MedicalHistoryPeriod;
  recordType: MedicalRecordTypeFilter;
  veterinarianId: string;
}

export interface PatientDetailItem extends PatientListItem {
  activeMedications: PatientMedicationSummary[];
  alerts: PatientAlert[];
  imageUrl?: string;
  lastConsultation: PatientConsultationSummary | null;
  medicalRecords: PatientMedicalRecord[];
  nextAppointment: PatientAppointmentSummary | null;
  sex: PatientSex;
  weightKg: number;
  weightHistory: PatientWeightRecord[];
}
