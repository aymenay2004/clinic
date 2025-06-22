import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Pill,
  Calendar,
  User,
  Stethoscope,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Print,
  Download,
  FileText
} from 'lucide-react';
import { Prescription, PrescribedMedicine } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const PrescriptionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const { user } = useAuth();

  // Mock prescriptions data
  const mockPrescriptions: Prescription[] = [
    {
      id: '1',
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
        description: 'Consultation post-opératoire',
        diagnostics: ['Infection post-opératoire'],
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
      medicines: [
        {
          medicine: {
            id: '1',
            name: 'Amoxicilline 500mg',
            barcode: '1234567890123',
            quantity: 50,
            unit: 'comprimés',
            expiryDate: new Date('2025-08-15'),
            provider: 'Antibio Pharma',
            price: 45.50,
            minStockLevel: 30,
            category: 'antibiotic',
            description: 'Antibiotique à large spectre',
            sideEffects: ['Troubles digestifs', 'Réactions allergiques'],
            dosageInstructions: '500mg 3 fois par jour pendant 7 jours',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          dosage: '500mg',
          duration: '7 jours',
          frequency: '3 fois par jour',
          quantity: 21,
          notes: 'À prendre pendant les repas',
          cost: 956.50
        },
        {
          medicine: {
            id: '2',
            name: 'Ibuprofène 400mg',
            barcode: '2345678901234',
            quantity: 8,
            unit: 'boîtes',
            expiryDate: new Date('2024-12-31'),
            provider: 'Pain Relief Co.',
            price: 320.00,
            minStockLevel: 15,
            category: 'painkiller',
            description: 'Anti-inflammatoire non stéroïdien',
            sideEffects: ['Troubles gastriques', 'Maux de tête'],
            dosageInstructions: '400mg toutes les 6-8 heures si nécessaire',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          dosage: '400mg',
          duration: '5 jours',
          frequency: 'Toutes les 8h si douleur',
          quantity: 15,
          notes: 'Arrêter si troubles gastriques',
          cost: 4800.00
        }
      ],
      notes: 'Prescription post-opératoire. Surveiller les signes d\'infection. Retour si pas d\'amélioration sous 48h.',
      status: 'active',
      totalCost: 5756.50,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
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
        description: 'Consultation préventive',
        diagnostics: ['Gingivite légère'],
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
      medicines: [
        {
          medicine: {
            id: '3',
            name: 'Bain de bouche antiseptique',
            barcode: '3456789012345',
            quantity: 15,
            unit: 'flacons',
            expiryDate: new Date('2025-06-30'),
            provider: 'Oral Care Plus',
            price: 850.00,
            minStockLevel: 10,
            category: 'antiseptic',
            description: 'Bain de bouche à la chlorhexidine',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          dosage: '15ml',
          duration: '14 jours',
          frequency: '2 fois par jour',
          quantity: 1,
          notes: 'Après brossage, ne pas rincer à l\'eau',
          cost: 850.00
        }
      ],
      notes: 'Prescription préventive pour améliorer l\'hygiène bucco-dentaire.',
      status: 'completed',
      totalCost: 850.00,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-29')
    }
  ];

  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.patient.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patient.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medicines.some(m => m.medicine.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || prescription.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'antibiotic': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'painkiller': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'antiseptic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'anesthetic': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Statistics
  const totalPrescriptions = filteredPrescriptions.length;
  const activePrescriptions = filteredPrescriptions.filter(p => p.status === 'active').length;
  const totalValue = filteredPrescriptions.reduce((sum, p) => sum + p.totalCost, 0);
  const averageValue = totalValue / totalPrescriptions || 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Prescriptions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestion des prescriptions médicamenteuses
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouvelle Prescription</span>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Prescriptions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalPrescriptions}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Prescriptions Actives</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activePrescriptions}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Valeur Totale</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalValue.toLocaleString()} DA</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Valeur Moyenne</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Math.round(averageValue).toLocaleString()} DA</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
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
              placeholder="Rechercher par patient ou médicament..."
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
              <option value="active">Actives</option>
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

            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-6">
          {filteredPrescriptions.map((prescription, index) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {prescription.patient.firstname} {prescription.patient.lastname}
                      </h3>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                        {getStatusIcon(prescription.status)}
                        <span>{getStatusText(prescription.status)}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {prescription.createdAt.toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {prescription.doctor.firstname} {prescription.doctor.lastname}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Total: {prescription.totalCost.toLocaleString()} DA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Voir">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Modifier">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition-colors" title="Imprimer">
                    <Print className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Medicines List */}
              <div className="bg-white dark:bg-gray-600 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Médicaments prescrits:</h4>
                <div className="space-y-3">
                  {prescription.medicines.map((prescribedMed, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h5 className="font-medium text-gray-900 dark:text-gray-100">
                            {prescribedMed.medicine.name}
                          </h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(prescribedMed.medicine.category)}`}>
                            {prescribedMed.medicine.category}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Dosage:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                              {prescribedMed.dosage}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Fréquence:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                              {prescribedMed.frequency}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Durée:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                              {prescribedMed.duration}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Quantité:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                              {prescribedMed.quantity}
                            </span>
                          </div>
                        </div>
                        
                        {prescribedMed.notes && (
                          <div className="mt-2">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">Notes: </span>
                            <span className="text-sm text-gray-900 dark:text-gray-100">{prescribedMed.notes}</span>
                          </div>
                        )}

                        {/* Side Effects Warning */}
                        {prescribedMed.medicine.sideEffects && prescribedMed.medicine.sideEffects.length > 0 && (
                          <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Effets secondaires possibles:</span>
                            </div>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                              {prescribedMed.medicine.sideEffects.join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right ml-4">
                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {prescribedMed.cost.toLocaleString()} DA
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescription Notes */}
              {prescription.notes && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Instructions du médecin:</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-400">{prescription.notes}</p>
                </div>
              )}

              {/* Patient Allergies Warning */}
              {prescription.patient.allergies.length > 0 && (
                <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <span className="font-medium text-red-800 dark:text-red-300">Allergies du patient:</span>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {prescription.patient.allergies.join(', ')}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-12">
            <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucune prescription trouvée</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Créez une nouvelle prescription ou modifiez vos critères de recherche.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PrescriptionsPage;