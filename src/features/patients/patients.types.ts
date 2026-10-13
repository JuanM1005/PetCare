export type Species = 'dog' | 'cat' | 'bird' | 'other';
export type PatientStatus = 'active' | 'inactive';

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
