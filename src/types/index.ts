export interface User {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  gender: 'male' | 'female';
  role: UserRole;
  username: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 
  | 'admin_medical' 
  | 'admin_administrative'
  | 'doctor'
  | 'receptionist'
  | 'assistant'
  | 'call_center'
  | 'radiologist'
  | 'photograph'
  | 'lab_agent';

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  cabinet: Room;
  cabinetNumber: string;
  agenda: Appointment[];
  patients: Patient[];
  medicalFiles: MedicalFile[];
  prescriptions: Prescription[];
  usedMedicines: Medicine[];
  messages: Message[];
  factures: Facture[];
  statistics: Statistique[];
  historique: Historique[];
  doctorRole: 'contributor' | 'employee';
  access: {
    viewOwnPatients: boolean;
    viewOwnStats: boolean;
    accessMedicalModules: boolean;
    accessFinancialOwn: boolean;
    globalStats: boolean;
    adminPrivileges: boolean;
  };
}

export type PatientType = 'OLD_PATIENT' | 'NEW_PATIENT' | 'URGENCE_PATIENT';

export interface Patient {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email?: string;
  gender: 'male' | 'female';
  city: string;
  province: string;
  patientType: PatientType;
  dateOfBirth: Date;
  appointments: Appointment[];
  medicalFiles: MedicalFile[];
  factures: Facture[];
  createdAt: Date;
  updatedAt: Date;
  historique: Historique[];
  description?: string;
}

export interface Appointment {
  id: string;
  patient: Patient;
  doctor: Doctor;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'in_progress' | 'waiting';
  reason: string;
  type: 'new' | 'follow-up' | 'emergency';
  room: Room;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalFile {
  id: string;
  patient: Patient;
  doctor: Doctor;
  date: Date;
  description: string;
  diagnostics: string[];
  treatments: string[];
  prescriptions: Prescription[];
  labResults: LabResult[];
  radiologyResults: RadiologyResult[];
  photos: ImageResult[];
  referrals: Doctor[];
  nextAppointment?: Appointment;
  updatedBy: User;
  medicalConditions: MedicalCondition[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalCondition {
  id: string;
  name: string;
  type: 'chronic' | 'temporary' | 'infectious' | 'allergy' | 'dental';
  description: string;
  symptoms: string[];
  riskLevel: 'low' | 'moderate' | 'high';
  isContagious: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Medicine {
  id: string;
  name: string;
  barcode: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  provider: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockMovement {
  id: string;
  medicine: Medicine;
  type: 'in' | 'out';
  quantity: number;
  doctor?: Doctor;
  relatedPrescription?: Prescription;
  createdAt: Date;
}

export interface Prescription {
  id: string;
  doctor: Doctor;
  patient: Patient;
  medicalFile: MedicalFile;
  medicines: PrescribedMedicine[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescribedMedicine {
  medicine: Medicine;
  dosage: string;
  duration: string;
  frequency: string;
  notes?: string;
}

export interface Room {
  id: string;
  name: string;
  number: string;
  type: 'consultation' | 'waiting' | 'xray' | 'lab' | 'photo' | 'treatment';
  assignedDoctor?: Doctor;
  status: 'available' | 'occupied' | 'unavailable';
  createdAt: Date;
  updatedAt: Date;
}

export interface Facture {
  id: string;
  patient: Patient;
  doctor: Doctor;
  services: Service[];
  totalAmount: number;
  amountPaid: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  status: 'paid' | 'partial' | 'unpaid' | 'refunded';
  date: Date;
  createdBy: User;
  notes?: string;
  isPrinted: boolean;
  barcode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  durationMinutes: number;
  isActive: boolean;
}

export interface Historique {
  id: string;
  user: User;
  actionType: 'create' | 'update' | 'delete' | 'login' | 'view' | 'prescription' | 'payment';
  targetType: 'Patient' | 'Appointment' | 'MedicalFile' | 'Prescription';
  targetId: string;
  description: string;
  timestamp: Date;
}

export interface Message {
  id: string;
  sender: User;
  receiver: User;
  targetPatient: Patient;
  targetType: 'lab' | 'xray' | 'photo' | 'doctor';
  content: string;
  status: 'sent' | 'delivered' | 'read';
  timestamp: Date;
  soundAlert: boolean;
}

export interface Notification {
  id: string;
  recipient: User;
  message: string;
  type: 'reminder' | 'alert' | 'message';
  seen: boolean;
  timestamp: Date;
}

export interface Statistique {
  id: string;
  date: Date;
  type: 'daily' | 'monthly' | 'custom';
  totalPatients: number;
  byGender?: Record<'male' | 'female', number>;
  byAgeGroup?: Record<string, number>;
  byService?: Record<string, number>;
  byCity?: Record<string, number>;
  byDoctor?: Record<string, number>;
  totalRevenue: number;
  revenueByService?: Record<string, number>;
  revenueByDoctor?: Record<string, number>;
  revenueByPaymentType?: Record<'cash' | 'card' | 'transfer', number>;
  generatedBy: User;
}

export interface RadiologyResult {
  id: string;
  patient: Patient;
  medicalFile: MedicalFile;
  imageUrl: string;
  type: 'panoramic' | 'lateral' | '3D';
  notes?: string;
  uploadedBy: User;
  createdAt: Date;
}

export interface LabResult {
  id: string;
  patient: Patient;
  medicalFile: MedicalFile;
  resultFileUrl: string;
  testType: string;
  notes?: string;
  uploadedBy: User;
  createdAt: Date;
}

export interface ImageResult {
  id: string;
  patient: Patient;
  medicalFile: MedicalFile;
  imageUrl: string;
  caption?: string;
  uploadedBy: User;
  createdAt: Date;
}