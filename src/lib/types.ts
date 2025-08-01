export type PatientData = {
  patientName?: string;
  dateOfBirth?: string;
  medicalConditions?: string[];
  allergies?: string[];
  medications?: string[];
};

export type Appointment = {
  date: Date;
  time: string;
};
