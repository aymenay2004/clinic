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
  profileImage?: string;
  lastLogin?: Date;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'ar' | 'en';
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    sound: boolean;
  };
  dashboard: {
    layout: 'grid' | 'list';
    widgets: string[];
  };
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
  | 'lab_agent'
  | 'stock_manager';

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
  workingHours: WorkingHours[];
  consultationFee: number;
  rating: number;
  totalPatients: number;
  totalConsultations: number;
  access: {
    viewOwnPatients: boolean;
    viewOwnStats: boolean;
    accessMedicalModules: boolean;
    accessFinancialOwn: boolean;
    globalStats: boolean;
    adminPrivileges: boolean;
  };
}

export interface WorkingHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  isActive: boolean;
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
  address?: string;
  patientType: PatientType;
  dateOfBirth: Date;
  appointments: Appointment[];
  medicalFiles: MedicalFile[];
  factures: Facture[];
  createdAt: Date;
  updatedAt: Date;
  historique: Historique[];
  description?: string;
  emergencyContact?: EmergencyContact;
  insurance?: InsuranceInfo;
  allergies: string[];
  chronicConditions: string[];
  lastVisit?: Date;
  totalVisits: number;
  totalSpent: number;
  rating?: number;
  feedback?: PatientFeedback[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  coverage: number; // percentage
  expiryDate: Date;
}

export interface PatientFeedback {
  id: string;
  rating: number;
  comment?: string;
  doctor: Doctor;
  appointment: Appointment;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  patient: Patient;
  doctor: Doctor;
  date: Date;
  time: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'in_progress' | 'waiting' | 'no_show';
  reason: string;
  type: 'new' | 'follow-up' | 'emergency' | 'consultation' | 'treatment' | 'checkup';
  room: Room;
  createdBy: User;
  notes?: string;
  reminderSent: boolean;
  attendanceStatus: 'present' | 'absent' | 'late';
  duration: number; // in minutes
  fee: number;
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
  referrals: Referral[];
  nextAppointment?: Appointment;
  updatedBy: User;
  medicalConditions: MedicalCondition[];
  vitalSigns?: VitalSigns;
  dentalChart?: DentalChart;
  treatmentPlan?: TreatmentPlan[];
  notes: MedicalNote[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VitalSigns {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  recordedAt: Date;
  recordedBy: User;
}

export interface DentalChart {
  teeth: ToothCondition[];
  updatedAt: Date;
  updatedBy: User;
}

export interface ToothCondition {
  toothNumber: number;
  condition: 'healthy' | 'cavity' | 'filled' | 'crown' | 'missing' | 'implant' | 'root_canal';
  notes?: string;
  treatmentDate?: Date;
}

export interface TreatmentPlan {
  id: string;
  treatment: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCost: number;
  estimatedDuration: number;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate?: Date;
  notes?: string;
}

export interface MedicalNote {
  id: string;
  content: string;
  type: 'general' | 'treatment' | 'observation' | 'follow_up';
  author: User;
  isPrivate: boolean;
  createdAt: Date;
}

export interface Referral {
  id: string;
  fromDoctor: Doctor;
  toDoctor: Doctor;
  patient: Patient;
  reason: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  notes?: string;
  createdAt: Date;
  respondedAt?: Date;
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
  price: number; // in DA
  minStockLevel: number;
  category: 'antibiotic' | 'painkiller' | 'anesthetic' | 'antiseptic' | 'supplement' | 'equipment';
  description?: string;
  sideEffects?: string[];
  dosageInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockMovement {
  id: string;
  medicine: Medicine;
  type: 'in' | 'out' | 'adjustment' | 'expired';
  quantity: number;
  reason: string;
  doctor?: Doctor;
  relatedPrescription?: Prescription;
  cost?: number;
  supplier?: string;
  createdBy: User;
  createdAt: Date;
}

export interface StockAlert {
  id: string;
  medicine: Medicine;
  type: 'low_stock' | 'expiry_warning' | 'expired';
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Prescription {
  id: string;
  doctor: Doctor;
  patient: Patient;
  medicalFile: MedicalFile;
  medicines: PrescribedMedicine[];
  notes?: string;
  status: 'active' | 'completed' | 'cancelled';
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescribedMedicine {
  medicine: Medicine;
  dosage: string;
  duration: string;
  frequency: string;
  quantity: number;
  notes?: string;
  cost: number;
}

export interface Room {
  id: string;
  name: string;
  number: string;
  type: 'consultation' | 'waiting' | 'xray' | 'lab' | 'photo' | 'treatment' | 'surgery';
  assignedDoctor?: Doctor;
  status: 'available' | 'occupied' | 'unavailable' | 'maintenance';
  equipment: Equipment[];
  capacity: number;
  floor: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'working' | 'maintenance' | 'broken';
  lastMaintenance?: Date;
  nextMaintenance?: Date;
}

export interface Facture {
  id: string;
  patient: Patient;
  doctor: Doctor;
  services: Service[];
  medicines?: PrescribedMedicine[];
  totalAmount: number; // in DA
  amountPaid: number; // in DA
  discount: number; // in DA
  tax: number; // in DA
  paymentMethod: 'cash' | 'card' | 'transfer' | 'check' | 'insurance';
  status: 'paid' | 'partial' | 'unpaid' | 'refunded' | 'cancelled';
  date: Date;
  dueDate?: Date;
  createdBy: User;
  notes?: string;
  isPrinted: boolean;
  barcode: string;
  receiptNumber: string;
  paymentHistory: Payment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  amount: number; // in DA
  method: 'cash' | 'card' | 'transfer' | 'check' | 'insurance';
  reference?: string;
  receivedBy: User;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  basePrice: number; // in DA
  durationMinutes: number;
  category: 'consultation' | 'treatment' | 'surgery' | 'diagnostic' | 'preventive';
  isActive: boolean;
  requiresEquipment?: string[];
}

export interface Historique {
  id: string;
  user: User;
  actionType: 'create' | 'update' | 'delete' | 'login' | 'view' | 'prescription' | 'payment' | 'call' | 'message';
  targetType: 'Patient' | 'Appointment' | 'MedicalFile' | 'Prescription' | 'User' | 'Medicine' | 'Room';
  targetId: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface Message {
  id: string;
  sender: User;
  receiver: User;
  targetPatient?: Patient;
  targetType: 'lab' | 'xray' | 'photo' | 'doctor' | 'general' | 'urgent';
  subject: string;
  content: string;
  attachments?: MessageAttachment[];
  status: 'sent' | 'delivered' | 'read' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  timestamp: Date;
  readAt?: Date;
  soundAlert: boolean;
  isSystemMessage: boolean;
}

export interface MessageAttachment {
  id: string;
  filename: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export interface Notification {
  id: string;
  recipient: User;
  title: string;
  message: string;
  type: 'reminder' | 'alert' | 'message' | 'appointment' | 'payment' | 'stock' | 'system';
  data?: any;
  seen: boolean;
  actionUrl?: string;
  timestamp: Date;
}

export interface Statistique {
  id: string;
  date: Date;
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
  totalPatients: number;
  newPatients: number;
  returningPatients: number;
  byGender?: Record<'male' | 'female', number>;
  byAgeGroup?: Record<string, number>;
  byService?: Record<string, number>;
  byCity?: Record<string, number>;
  byDoctor?: Record<string, number>;
  totalRevenue: number; // in DA
  revenueByService?: Record<string, number>;
  revenueByDoctor?: Record<string, number>;
  revenueByPaymentType?: Record<'cash' | 'card' | 'transfer' | 'check' | 'insurance', number>;
  appointmentStats: {
    total: number;
    completed: number;
    cancelled: number;
    noShow: number;
  };
  averageWaitingTime: number; // in minutes
  averageConsultationTime: number; // in minutes
  patientSatisfaction: number; // average rating
  roomOccupancy: Record<string, number>;
  generatedBy: User;
}

export interface RadiologyResult {
  id: string;
  patient: Patient;
  medicalFile: MedicalFile;
  requestedBy: Doctor;
  performedBy: User;
  imageUrl: string;
  type: 'panoramic' | 'lateral' | '3D' | 'bitewing' | 'periapical';
  findings: string;
  recommendations?: string;
  status: 'pending' | 'completed' | 'reviewed';
  notes?: string;
  uploadedBy: User;
  reviewedBy?: Doctor;
  createdAt: Date;
  completedAt?: Date;
}

export interface LabResult {
  id: string;
  patient: Patient;
  medicalFile: MedicalFile;
  requestedBy: Doctor;
  performedBy: User;
  resultFileUrl: string;
  testType: string;
  results: LabTestResult[];
  status: 'pending' | 'in_progress' | 'completed' | 'reviewed';
  notes?: string;
  uploadedBy: User;
  reviewedBy?: Doctor;
  createdAt: Date;
  completedAt?: Date;
}

export interface LabTestResult {
  parameter: string;
  value: string;
  unit?: string;
  referenceRange: string;
  status: 'normal' | 'abnormal' | 'critical';
}

export interface ImageResult {
  id: string;
  patient: Patient;
  medicalFile: MedicalFile;
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  category: 'before' | 'after' | 'during' | 'xray' | 'clinical';
  tags: string[];
  uploadedBy: User;
  createdAt: Date;
}

export interface CallLog {
  id: string;
  patient: Patient;
  calledBy: User;
  callType: 'reminder' | 'follow_up' | 'appointment' | 'result' | 'emergency';
  status: 'answered' | 'no_answer' | 'busy' | 'invalid';
  duration?: number; // in seconds
  notes?: string;
  scheduledCallback?: Date;
  createdAt: Date;
}

export interface SMSLog {
  id: string;
  patient: Patient;
  sentBy: User;
  message: string;
  type: 'reminder' | 'confirmation' | 'result' | 'promotional';
  status: 'sent' | 'delivered' | 'failed';
  cost: number; // in DA
  createdAt: Date;
}

export interface SystemConfiguration {
  id: string;
  category: 'general' | 'billing' | 'notifications' | 'security' | 'integrations';
  key: string;
  value: string;
  description: string;
  isEditable: boolean;
  updatedBy: User;
  updatedAt: Date;
}

export interface BackupLog {
  id: string;
  type: 'automatic' | 'manual';
  status: 'success' | 'failed' | 'in_progress';
  fileSize: number;
  location: string;
  createdBy?: User;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface AuditLog {
  id: string;
  user: User;
  action: string;
  resource: string;
  resourceId: string;
  oldValues?: any;
  newValues?: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  targetAudience: 'patients' | 'staff' | 'doctors';
  isActive: boolean;
  responses: SurveyResponse[];
  createdBy: User;
  createdAt: Date;
  expiresAt?: Date;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'text' | 'rating' | 'multiple_choice' | 'yes_no';
  options?: string[];
  required: boolean;
}

export interface SurveyResponse {
  id: string;
  survey: Survey;
  respondent?: Patient | User;
  answers: SurveyAnswer[];
  submittedAt: Date;
}

export interface SurveyAnswer {
  questionId: string;
  answer: string | number;
}

export interface WaitingRoomCall {
  id: string;
  patient: Patient;
  doctor: Doctor;
  cabinetNumber: string;
  timestamp: Date;
  isAnonymized: boolean;
}

export interface WaitingRoomSettings {
  displayMode: 'full_name' | 'first_name_only' | 'initials' | 'anonymous';
  autoRefreshInterval: number; // in seconds
  soundEnabled: boolean;
  animationEnabled: boolean;
  showQueueNumber: boolean;
  showEstimatedTime: boolean;
}