
export interface StudentData {
  id?: string;
  name: string;
  rollNumber: string;
  classDiv: string;
  allergies: string[];
  photo: string | null;
  rackNumber: string;
  busRouteNumber: string;
  createdAt?: string;
}

export type CardTemplate = 'template-1' | 'template-2';
