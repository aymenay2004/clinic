import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play
} from 'lucide-react';
import { Appointment, Doctor } from '../../types';
import { useWaitingRoom } from '../../contexts/WaitingRoomContext';
import { useAuth } from '../../contexts/AuthContext';

const AppointmentList: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { callNextPatient } = useWaitingRoom();
  const { user } = useAuth();

  // Mock data - replace with real data
  const mockDoctors: Doctor[] = [
    {
      id: '1',
      firstname: 'Dr. Sarah',
      lastname: 'Benali',
      phone: '0661234567',
      email: 'sarah.benali@clinic.ma',
      gender: 'female',
      role: 'doctor',
      username: 'dr.benali',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      specialization: 'Orthodontie',
      cabinetNumber: 'Cabinet 1',
      cabinet: {
        id: '1',
        name: 'Cabinet 1',
        number: '1',
        type: 'consultation',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      agenda: [],
      patients: [],
      medicalFiles: [],
      prescriptions: [],
      usedMedicines: [],
      messages: [],
      factures: [],
      statistics: [],
      historique: [],
      doctorRole: 'employee',
      access: {
        viewOwnPatients: true,
        viewOwnStats: true,
        accessMedicalModules: true,
        accessFinancialOwn: true,
        globalStats: false,
        adminPrivileges: false
      }
    }
  ];

  const mockAppointments: Appointment[] = [
    {
      id: '1',
      patient: {
        id: '1',
        firstname: 'Amina',
        lastname: 'Benali',
        phone: '0661234567',
        email: 'amina.benali@email.com',
        gender: 'female',
        city: 'Casablanca',
        province: 'Grand Casablanca',
        patientType: 'OLD_PATIENT',
        dateOfBirth: new Date('1985-03-15'),
        appointments: [],
        medicalFiles: [],
        factures: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        historique: []
      },
      doctor: mockDoctors[0],
      date: new Date(),
      time: '09:00',
      status: 'waiting',
      reason: 'Consultation de routine',
      type: 'follow-up',
      room: mockDoctors[0].cabinet,
      createdBy: user!,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      patient: {
        id: '2',
        firstname: 'Mohamed',
        lastname: 'Alami',
        phone: '0662345678',
        email: 'mohamed.alami@email.com',
        gender: 'male',
        city: 'Rabat',
        province: 'Rabat-Salé-Kénitra',
        patientType: 'NEW_PATIENT',
        dateOfBirth: new Date('1990-07-22'),
        appointments: [],
        medicalFiles: [],
        factures: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        historique: []
      },
      doctor: mockDoctors[0],
      date: new Date(),
      time: '10:30',
      status: 'confirmed',
      reason: 'Première consultation',
      type: 'new',
      room: mockDoctors[0].cabinet,
      createdBy: user!,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'completed': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in_progress': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400';
      case 'waiting': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'waiting': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'waiting': return 'En attente';
      default: return status;
    }
  };

  const handleCallNext = (appointment: Appointment) => {
    callNextPatient(appointment.patient, appointment.doctor, appointment.doctor.cabinetNumber);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestion des Rendez-vous</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Planifiez et gérez les rendez-vous des patients
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau Rendez-vous</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Rendez-vous du jour</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="space-y-4">
          {mockAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {appointment.patient.firstname} {appointment.patient.lastname}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{appointment.doctor.cabinetNumber}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{appointment.patient.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Dr. {appointment.doctor.firstname} {appointment.doctor.lastname}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.reason}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      <span>{getStatusText(appointment.status)}</span>
                    </span>

                    {(appointment.status === 'waiting' || appointment.status === 'confirmed') && user?.role === 'doctor' && (
                      <button
                        onClick={() => handleCallNext(appointment)}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <Play className="w-4 h-4" />
                        <span>Appeler</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {mockAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucun rendez-vous aujourd'hui</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Planifiez de nouveaux rendez-vous pour vos patients.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AppointmentList;