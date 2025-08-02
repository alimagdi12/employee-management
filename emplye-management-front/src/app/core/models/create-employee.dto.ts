export interface CreateEmployeeDto {
  name: string;
  code: string;
  maritalStatus: string;
  birthdate: Date;
  phone?: string;
  religion?: string;
  address?: string;
  job?: string;
  appointmentDate: Date;
  workReceiptDate: Date;
  schoolEntryDate?: Date;
  currentDegree?: string;
  currentDegreeDate?: Date;
  transferPlace?: string;
  insuranceNumber?: string;
}
