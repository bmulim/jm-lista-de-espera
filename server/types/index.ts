export interface Student {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  objective: string;
  healthRestrictions: string;
  shift: 'morning' | 'afternoon' | 'evening';
  enrollmentDate: string;
  isEnrolled: boolean;
  enrolledAt?: string;
}

export interface StudentFormData {
  name: string;
  email: string;
  whatsapp: string;
  objective: string;
  healthRestrictions: string;
  shift: 'morning' | 'afternoon' | 'evening';
}