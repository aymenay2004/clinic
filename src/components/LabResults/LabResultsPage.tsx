import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  TestTube,
  Calendar,
  User,
  Stethoscope,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Upload,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { LabResult, LabTestResult } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const LabResultsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'reviewed'>('all');
  const [filterTestType, setFilterTestType] = useState<'all' | 'blood' | 'urine' | 'saliva' | 'biopsy'>('all');
  const { user } = useAuth();

  // Mock lab results data
  const mockLabResults: LabResult[] = [
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
      medicalFile: {
        id: '1',
        patient: {} as any,
        doctor: {} as any,
        date: new Date(),
        description: 'Bilan pré-opératoire',
        diagnostics: ['Infection suspectée'],
        treatments: [],
        prescriptions: [],
        labResults: [],
        radiologyResults: [],
        photos: [],
        referrals: [],
        updatedBy: user!,
        medicalConditions: [],
        notes: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      requestedBy: {
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
      performedBy: user!,
      resultFileUrl: '/lab-results/result-001.pdf',
      testType: 'Bilan sanguin complet',
      results: [
        {
          parameter: 'Globules rouges',
          value: '4.2',
          unit: 'M/μL',
          referenceRange: '4.0-5.2',
          status: 'normal'
        },
        {
          parameter: 'Globules blancs',
          value: '12.5',
          unit: 'K/μL',
          referenceRange: '4.0-10.0',
          status: 'abnormal'
        },
        {
          parameter: 'Hémoglobine',
          value: '13.8',
          unit: 'g/dL',
          referenceRange: '12.0-15.0',
          status: 'normal'
        },
        {
          parameter: 'Plaquettes',
          value: '280',
          unit: 'K/μL',
          referenceRange: '150-400',
          status: 'normal'
        },
        {
          parameter: 'CRP',
          value: '15.2',
          unit: 'mg/L',
          referenceRange: '<3.0',
          status: 'critical'
        }
      ],
      status: 'completed',
      notes: 'Élévation des globules blancs et CRP suggérant une infection. Recommandation: antibiothérapie.',
      uploadedBy: user!,
      reviewedBy: {
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
      createdAt: new Date('2024-01-20'),
      completedAt: new Date('2024-01-22')
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
        city: 'Oran',
        province: 'Oran',
        patientType: 'NEW_PATIENT',
        dateOfBirth: new Date('1990-07-22'),
        appointments: [],
        medicalFiles: [],
        factures: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        historique: [],
        allergies: [],
        chronicConditions: [],
        totalVisits: 3,
        totalSpent: 12000
      },
      medicalFile: {
        id: '2',
        patient: {} as any,
        doctor: {} as any,
        date: new Date(),
        description: 'Contrôle de routine',
        diagnostics: [],
        treatments: [],
        prescriptions: [],
        labResults: [],
        radiologyResults: [],
        photos: [],
        referrals: [],
        updatedBy: user!,
        medicalConditions: [],
        notes: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      requestedBy: {
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
      performedBy: user!,
      resultFileUrl: '/lab-results/result-002.pdf',
      testType: 'Analyse salivaire',
      results: [
        {
          parameter: 'pH salivaire',
          value: '6.8',
          unit: '',
          referenceRange: '6.0-7.4',
          status: 'normal'
        },
        {
          parameter: 'Débit salivaire',
          value: '1.2',
          unit: 'mL/min',
          referenceRange: '1.0-3.0',
          status: 'normal'
        },
        {
          parameter: 'Streptococcus mutans',
          value: 'Positif',
          unit: '',
          referenceRange: 'Négatif',
          status: 'abnormal'
        }
      ],
      status: 'pending',
      notes: 'En attente de validation par le médecin traitant.',
      uploadedBy: user!,
      createdAt: new Date('2024-01-18'),
      completedAt: new Date('2024-01-19')
    }
  ];

  const filteredResults = mockLabResults.filter(result => {
    const matchesSearch = 
      result.patient.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.patient.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || result.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'reviewed': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <TestTube className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'reviewed': return <Eye className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'reviewed': return 'Validé';
      default: return status;
    }
  };

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 dark:text-green-400';
      case 'abnormal': return 'text-orange-600 dark:text-orange-400';
      case 'critical': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getResultStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'abnormal': return <TrendingUp className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  // Statistics
  const totalResults = filteredResults.length;
  const pendingResults = filteredResults.filter(r => r.status === 'pending').length;
  const completedResults = filteredResults.filter(r => r.status === 'completed').length;
  const criticalResults = filteredResults.reduce((count, result) => {
    return count + result.results.filter(r => r.status === 'critical').length;
  }, 0);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Résultats de Laboratoire</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestion des analyses et résultats de laboratoire
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Télécharger Résultat</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Nouvelle Demande</span>
          </button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Analyses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalResults}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <TestTube className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">En Attente</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pendingResults}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Terminées</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{completedResults}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Résultats Critiques</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{criticalResults}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par patient ou type d'analyse..."
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
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminées</option>
              <option value="reviewed">Validées</option>
            </select>

            <select
              value={filterTestType}
              onChange={(e) => setFilterTestType(e.target.value as any)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">Tous les types</option>
              <option value="blood">Analyses sanguines</option>
              <option value="urine">Analyses urinaires</option>
              <option value="saliva">Analyses salivaires</option>
              <option value="biopsy">Biopsies</option>
            </select>

            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Lab Results List */}
        <div className="space-y-6">
          {filteredResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <TestTube className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {result.patient.firstname} {result.patient.lastname}
                      </h3>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                        {getStatusIcon(result.status)}
                        <span>{getStatusText(result.status)}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {result.createdAt.toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {result.requestedBy.firstname} {result.requestedBy.lastname}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TestTube className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {result.testType}
                        </span>
                      </div>
                      {result.completedAt && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Terminé le {result.completedAt.toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Voir">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Télécharger">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition-colors" title="Rapport">
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Test Results */}
              {result.results.length > 0 && (
                <div className="bg-white dark:bg-gray-600 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Résultats d'analyse:</h4>
                  <div className="space-y-3">
                    {result.results.map((testResult, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h5 className="font-medium text-gray-900 dark:text-gray-100">
                              {testResult.parameter}
                            </h5>
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getResultStatusColor(testResult.status)}`}>
                              {getResultStatusIcon(testResult.status)}
                              <span className="capitalize">{testResult.status}</span>
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Valeur:</span>
                              <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                                {testResult.value} {testResult.unit}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Référence:</span>
                              <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                                {testResult.referenceRange} {testResult.unit}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Critical Results Alert */}
              {result.results.some(r => r.status === 'critical') && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <span className="font-medium text-red-800 dark:text-red-300">Résultats critiques détectés</span>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Certains paramètres nécessitent une attention médicale immédiate.
                  </p>
                </div>
              )}

              {/* Notes */}
              {result.notes && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Notes du laboratoire:</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-400">{result.notes}</p>
                </div>
              )}

              {/* Review Information */}
              {result.reviewedBy && (
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    Validé par: {result.reviewedBy.firstname} {result.reviewedBy.lastname}
                  </span>
                  <span>
                    Téléchargé par: {result.uploadedBy.firstname} {result.uploadedBy.lastname}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <TestTube className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Créez une nouvelle demande d'analyse ou modifiez vos critères de recherche.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LabResultsPage;