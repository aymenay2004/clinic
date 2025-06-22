import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  FileText,
  Calendar,
  User,
  Stethoscope,
  Heart,
  Activity,
  AlertTriangle,
  Download,
  Print,
  Share2
} from 'lucide-react';
import { MedicalFile, Patient, Doctor } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const MedicalFilesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'recent' | 'urgent' | 'follow_up'>('all');
  const { user } = useAuth();

  // Mock data
  const mockMedicalFiles: MedicalFile[] = [
    {
      id: '1',
      patient: {
        id: '1',
        firstname: 'Amina',
        lastname: 'Benali',
        phone: '0661234567',
        email: 'amina.benali@email.com',
        gender: 'female',
        city: 'Alger',
        province: 'Alger',
        patientType: 'OLD_PATIENT',
        dateOfBirth: new Date('1985-03-15'),
        appointments: [],
        medicalFiles: [],
        factures: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        historique: [],
        allergies: ['Pénicilline'],
        chronicConditions: ['Hypertension'],
        totalVisits: 12,
        totalSpent: 45000
      },
      doctor: {
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
          equipment: [],
          capacity: 2,
          floor: 1,
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
        workingHours: [],
        consultationFee: 3500,
        rating: 4.8,
        totalPatients: 156,
        totalConsultations: 234,
        access: {
          viewOwnPatients: true,
          viewOwnStats: true,
          accessMedicalModules: true,
          accessFinancialOwn: true,
          globalStats: false,
          adminPrivileges: false
        }
      },
      date: new Date(),
      description: 'Consultation de routine - Contrôle orthodontique',
      diagnostics: ['Malocclusion classe II', 'Encombrement dentaire'],
      treatments: ['Ajustement appareil orthodontique', 'Nettoyage professionnel'],
      prescriptions: [],
      labResults: [],
      radiologyResults: [],
      photos: [],
      referrals: [],
      updatedBy: user!,
      medicalConditions: [],
      vitalSigns: {
        bloodPressure: '120/80',
        heartRate: 72,
        temperature: 36.5,
        recordedAt: new Date(),
        recordedBy: user!
      },
      dentalChart: {
        teeth: [
          { toothNumber: 11, condition: 'healthy' },
          { toothNumber: 12, condition: 'filled', treatmentDate: new Date('2023-06-15') },
          { toothNumber: 21, condition: 'crown', treatmentDate: new Date('2023-08-20') }
        ],
        updatedAt: new Date(),
        updatedBy: user!
      },
      treatmentPlan: [
        {
          id: '1',
          treatment: 'Remplacement couronne 21',
          priority: 'medium',
          estimatedCost: 25000,
          estimatedDuration: 90,
          status: 'planned',
          scheduledDate: new Date('2024-02-15')
        }
      ],
      notes: [
        {
          id: '1',
          content: 'Patient coopératif, bonne hygiène dentaire',
          type: 'general',
          author: user!,
          isPrivate: false,
          createdAt: new Date()
        }
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date()
    }
  ];

  const filteredFiles = mockMedicalFiles.filter(file => {
    const matchesSearch = 
      file.patient.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.patient.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getUrgencyColor = (conditions: string[]) => {
    if (conditions.some(c => c.includes('urgent') || c.includes('critique'))) {
      return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
    }
    return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dossiers Médicaux</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestion complète des dossiers médicaux des patients
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau Dossier</span>
        </button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par patient ou diagnostic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">Tous les dossiers</option>
              <option value="recent">Récents</option>
              <option value="urgent">Urgents</option>
              <option value="follow_up">Suivi requis</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Medical Files List */}
        <div className="space-y-4">
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {file.patient.firstname} {file.patient.lastname}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(file.diagnostics)}`}>
                        {file.diagnostics.length > 0 ? 'Diagnostic établi' : 'En cours'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{file.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {file.date.toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Dr. {file.doctor.firstname} {file.doctor.lastname}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {file.patient.totalVisits} visites
                        </span>
                      </div>
                    </div>

                    {/* Vital Signs */}
                    {file.vitalSigns && (
                      <div className="bg-white dark:bg-gray-600 rounded-lg p-3 mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                          <Heart className="w-4 h-4 mr-2 text-red-500" />
                          Signes Vitaux
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Tension:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                              {file.vitalSigns.bloodPressure}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Pouls:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                              {file.vitalSigns.heartRate} bpm
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Température:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                              {file.vitalSigns.temperature}°C
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Diagnostics */}
                    {file.diagnostics.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Diagnostics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {file.diagnostics.map((diagnostic, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-xs">
                              {diagnostic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Treatment Plan */}
                    {file.treatmentPlan && file.treatmentPlan.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Plan de Traitement:</h4>
                        <div className="space-y-2">
                          {file.treatmentPlan.slice(0, 2).map((plan) => (
                            <div key={plan.id} className="flex items-center justify-between bg-white dark:bg-gray-600 rounded p-2">
                              <span className="text-sm text-gray-900 dark:text-gray-100">{plan.treatment}</span>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  plan.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                                  plan.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                }`}>
                                  {plan.priority}
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {plan.estimatedCost.toLocaleString()} DA
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Allergies & Conditions */}
                    {(file.patient.allergies.length > 0 || file.patient.chronicConditions.length > 0) && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          <span className="font-medium text-red-800 dark:text-red-300">Alertes Médicales</span>
                        </div>
                        {file.patient.allergies.length > 0 && (
                          <div className="mb-2">
                            <span className="text-sm font-medium text-red-700 dark:text-red-300">Allergies: </span>
                            <span className="text-sm text-red-600 dark:text-red-400">
                              {file.patient.allergies.join(', ')}
                            </span>
                          </div>
                        )}
                        {file.patient.chronicConditions.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-red-700 dark:text-red-300">Conditions chroniques: </span>
                            <span className="text-sm text-red-600 dark:text-red-400">
                              {file.patient.chronicConditions.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Voir">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Modifier">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition-colors" title="Imprimer">
                    <Print className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg transition-colors" title="Partager">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucun dossier médical trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Créez un nouveau dossier médical pour commencer.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MedicalFilesList;