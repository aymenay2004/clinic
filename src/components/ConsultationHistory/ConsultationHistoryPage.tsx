import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Search, 
  Filter, 
  Clock,
  User,
  Stethoscope,
  FileText,
  TrendingUp,
  Activity,
  Eye,
  Download,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ConsultationRecord {
  id: string;
  patient: {
    id: string;
    firstname: string;
    lastname: string;
    phone: string;
    age: number;
  };
  doctor: {
    id: string;
    firstname: string;
    lastname: string;
    specialization: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  type: 'consultation' | 'follow_up' | 'emergency' | 'treatment' | 'checkup';
  status: 'completed' | 'in_progress' | 'cancelled' | 'no_show';
  diagnosis: string[];
  treatments: string[];
  fee: number;
  paymentStatus: 'paid' | 'pending' | 'partial';
  notes: string;
  nextAppointment?: Date;
  satisfaction?: number;
}

const ConsultationHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'consultation' | 'treatment' | 'emergency'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'cancelled'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const { user } = useAuth();

  // Mock consultation data
  const mockConsultations: ConsultationRecord[] = [
    {
      id: '1',
      patient: {
        id: '1',
        firstname: 'Amina',
        lastname: 'Benali',
        phone: '0661234567',
        age: 39
      },
      doctor: {
        id: '1',
        firstname: 'Dr. Sarah',
        lastname: 'Benali',
        specialization: 'Orthodontie'
      },
      date: new Date('2024-01-20'),
      startTime: '09:00',
      endTime: '09:45',
      duration: 45,
      type: 'consultation',
      status: 'completed',
      diagnosis: ['Malocclusion classe II', 'Encombrement dentaire'],
      treatments: ['Ajustement appareil orthodontique', 'Nettoyage professionnel'],
      fee: 3500,
      paymentStatus: 'paid',
      notes: 'Patient coopératif, progression satisfaisante du traitement orthodontique',
      nextAppointment: new Date('2024-02-20'),
      satisfaction: 5
    },
    {
      id: '2',
      patient: {
        id: '2',
        firstname: 'Mohamed',
        lastname: 'Alami',
        phone: '0662345678',
        age: 34
      },
      doctor: {
        id: '1',
        firstname: 'Dr. Sarah',
        lastname: 'Benali',
        specialization: 'Orthodontie'
      },
      date: new Date('2024-01-19'),
      startTime: '14:30',
      endTime: '15:15',
      duration: 45,
      type: 'treatment',
      status: 'completed',
      diagnosis: ['Carie dentaire 36', 'Gingivite localisée'],
      treatments: ['Obturation composite', 'Détartrage'],
      fee: 4500,
      paymentStatus: 'paid',
      notes: 'Traitement réalisé sous anesthésie locale, patient informé des soins d\'hygiène',
      satisfaction: 4
    },
    {
      id: '3',
      patient: {
        id: '3',
        firstname: 'Fatima',
        lastname: 'Zahra',
        phone: '0663456789',
        age: 46
      },
      doctor: {
        id: '1',
        firstname: 'Dr. Sarah',
        lastname: 'Benali',
        specialization: 'Orthodontie'
      },
      date: new Date('2024-01-18'),
      startTime: '16:00',
      endTime: '16:20',
      duration: 20,
      type: 'emergency',
      status: 'completed',
      diagnosis: ['Pulpite aiguë 47'],
      treatments: ['Traitement d\'urgence', 'Prescription antalgiques'],
      fee: 2500,
      paymentStatus: 'paid',
      notes: 'Urgence dentaire, patient orienté vers endodontiste',
      nextAppointment: new Date('2024-01-25')
    }
  ];

  const filteredConsultations = mockConsultations.filter(consultation => {
    const matchesSearch = 
      consultation.patient.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.patient.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.diagnosis.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === 'all' || consultation.type === filterType;
    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'treatment': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'emergency': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'follow_up': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'checkup': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'consultation': return 'Consultation';
      case 'treatment': return 'Traitement';
      case 'emergency': return 'Urgence';
      case 'follow_up': return 'Suivi';
      case 'checkup': return 'Contrôle';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400';
      case 'cancelled': return 'text-red-600 dark:text-red-400';
      case 'no_show': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'partial': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Statistics
  const totalConsultations = filteredConsultations.length;
  const totalRevenue = filteredConsultations.reduce((sum, c) => sum + c.fee, 0);
  const averageDuration = filteredConsultations.reduce((sum, c) => sum + c.duration, 0) / totalConsultations || 0;
  const averageSatisfaction = filteredConsultations
    .filter(c => c.satisfaction)
    .reduce((sum, c) => sum + (c.satisfaction || 0), 0) / filteredConsultations.filter(c => c.satisfaction).length || 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Historique des Consultations</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Suivi détaillé de toutes les consultations et traitements
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Exporter Rapport</span>
        </button>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Consultations</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalConsultations}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Revenus Totaux</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalRevenue.toLocaleString()} DA</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Durée Moyenne</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Math.round(averageDuration)} min</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Satisfaction Moyenne</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{averageSatisfaction.toFixed(1)}/5</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-orange-600 dark:text-orange-400" />
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
              placeholder="Rechercher par patient ou diagnostic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">Tous les types</option>
              <option value="consultation">Consultations</option>
              <option value="treatment">Traitements</option>
              <option value="emergency">Urgences</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Terminées</option>
              <option value="cancelled">Annulées</option>
            </select>

            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
          </div>
        </div>

        {/* Consultations List */}
        <div className="space-y-4">
          {filteredConsultations.map((consultation, index) => (
            <motion.div
              key={consultation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {consultation.patient.firstname} {consultation.patient.lastname}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(consultation.type)}`}>
                        {getTypeLabel(consultation.type)}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(consultation.paymentStatus)}`}>
                        {consultation.paymentStatus === 'paid' ? 'Payé' : consultation.paymentStatus === 'pending' ? 'En attente' : 'Partiel'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {consultation.date.toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {consultation.startTime} - {consultation.endTime} ({consultation.duration}min)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {consultation.doctor.firstname} {consultation.doctor.lastname}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {consultation.fee.toLocaleString()} DA
                        </span>
                      </div>
                    </div>

                    {/* Diagnosis */}
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Diagnostic:</h4>
                      <div className="flex flex-wrap gap-2">
                        {consultation.diagnosis.map((diag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-xs">
                            {diag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Treatments */}
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Traitements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {consultation.treatments.map((treatment, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-xs">
                            {treatment}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white dark:bg-gray-600 rounded-lg p-3 mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Notes:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{consultation.notes}</p>
                    </div>

                    {/* Next Appointment */}
                    {consultation.nextAppointment && (
                      <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                        <ChevronRight className="w-4 h-4" />
                        <span>Prochain RDV: {consultation.nextAppointment.toLocaleDateString('fr-FR')}</span>
                      </div>
                    )}

                    {/* Satisfaction */}
                    {consultation.satisfaction && (
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Satisfaction:</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < consultation.satisfaction! ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Voir détails">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Dossier médical">
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredConsultations.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucune consultation trouvée</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Modifiez vos critères de recherche pour voir plus de résultats.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ConsultationHistoryPage;