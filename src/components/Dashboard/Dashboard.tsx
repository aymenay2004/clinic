import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Activity, 
  TrendingUp,
  Clock,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import StatsCard from './StatsCard';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Patients Totaux',
      value: '2,847',
      change: 12,
      icon: Users,
      color: 'blue' as const
    },
    {
      title: 'Rendez-vous Aujourd\'hui',
      value: '24',
      change: 8,
      icon: Calendar,
      color: 'green' as const
    },
    {
      title: 'Revenus ce Mois',
      value: '45,280 MAD',
      change: 15,
      icon: DollarSign,
      color: 'orange' as const
    },
    {
      title: 'Taux de Satisfaction',
      value: '96%',
      change: 3,
      icon: TrendingUp,
      color: 'purple' as const
    }
  ];

  const recentAppointments = [
    {
      id: '1',
      patient: 'Amina Benali',
      time: '09:00',
      type: 'Consultation',
      status: 'confirmed'
    },
    {
      id: '2',
      patient: 'Mohamed Alami',
      time: '10:30',
      type: 'Nettoyage',
      status: 'pending'
    },
    {
      id: '3',
      patient: 'Fatima Zahra',
      time: '14:00',
      type: 'Extraction',
      status: 'confirmed'
    },
    {
      id: '4',
      patient: 'Youssef Hassani',
      time: '15:30',
      type: 'Urgence',
      status: 'urgent'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'urgent': return 'Urgent';
      default: return status;
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
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user?.firstname} ! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Voici un aperçu de votre clinique aujourd'hui
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Nouveau Rendez-vous
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Rapport Mensuel
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Rendez-vous d'Aujourd'hui</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-4">
            {recentAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {appointment.patient.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{appointment.time}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activités Récentes</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Nouveau patient enregistré</p>
                  <p className="text-xs text-gray-500">Il y a 5 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Rendez-vous confirmé</p>
                  <p className="text-xs text-gray-500">Il y a 12 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Stock faible - Anesthésique</p>
                  <p className="text-xs text-gray-500">Il y a 1 heure</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Conseil du Jour 💡</h3>
            <p className="text-blue-100 text-sm">
              N'oubliez pas de rappeler aux patients leurs rendez-vous de demain pour réduire les absences.
            </p>
            <button className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
              Envoyer Rappels
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;