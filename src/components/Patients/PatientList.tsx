import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Calendar,
  Phone,
  Mail,
  MapPin,
  User
} from 'lucide-react';
import { Patient } from '../../types';

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'new' | 'old' | 'urgent'>('all');

  // Mock data - replace with real data
  const mockPatients: Patient[] = [
    {
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
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-01-15'),
      historique: [],
      description: 'Patiente régulière, traitement orthodontique en cours'
    },
    {
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
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
      historique: [],
      description: 'Nouveau patient, première consultation'
    },
    {
      id: '3',
      firstname: 'Fatima',
      lastname: 'Zahra',
      phone: '0663456789',
      email: 'fatima.zahra@email.com',
      gender: 'female',
      city: 'Marrakech',
      province: 'Marrakech-Safi',
      patientType: 'URGENCE_PATIENT',
      dateOfBirth: new Date('1978-11-08'),
      appointments: [],
      medicalFiles: [],
      factures: [],
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
      historique: [],
      description: 'Urgence dentaire - douleur sévère'
    }
  ];

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = 
      patient.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm);

    const matchesFilter = 
      filterType === 'all' ||
      (filterType === 'new' && patient.patientType === 'NEW_PATIENT') ||
      (filterType === 'old' && patient.patientType === 'OLD_PATIENT') ||
      (filterType === 'urgent' && patient.patientType === 'URGENCE_PATIENT');

    return matchesSearch && matchesFilter;
  });

  const getPatientTypeColor = (type: string) => {
    switch (type) {
      case 'NEW_PATIENT': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'OLD_PATIENT': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'URGENCE_PATIENT': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPatientTypeLabel = (type: string) => {
    switch (type) {
      case 'NEW_PATIENT': return 'Nouveau';
      case 'OLD_PATIENT': return 'Ancien';
      case 'URGENCE_PATIENT': return 'Urgence';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestion des Patients</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez les dossiers patients et leurs informations
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau Patient</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">Tous les patients</option>
                <option value="new">Nouveaux patients</option>
                <option value="old">Anciens patients</option>
                <option value="urgent">Patients urgents</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {patient.firstname} {patient.lastname}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPatientTypeColor(patient.patientType)}`}>
                      {getPatientTypeLabel(patient.patientType)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phone}</span>
                </div>
                {patient.email && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{patient.email}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{patient.city}</span>
                </div>
              </div>

              {patient.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {patient.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Créé le {patient.createdAt.toLocaleDateString('fr-FR')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucun patient trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos critères de recherche ou ajoutez un nouveau patient.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PatientList;