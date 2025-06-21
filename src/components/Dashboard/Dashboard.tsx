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
  AlertTriangle,
  Star,
  Phone,
  MessageSquare
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
      value: '1,357,000 DA',
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
      status: 'confirmed',
      fee: '3,500 DA'
    },
    {
      id: '2',
      patient: 'Mohamed Alami',
      time: '10:30',
      type: 'Nettoyage',
      status: 'pending',
      fee: '2,500 DA'
    },
    {
      id: '3',
      patient: 'Fatima Zahra',
      time: '14:00',
      type: 'Extraction',
      status: 'confirmed',
      fee: '5,000 DA'
    },
    {
      id: '4',
      patient: 'Youssef Hassani',
      time: '15:30',
      type: 'Urgence',
      status: 'urgent',
      fee: '4,000 DA'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'patient',
      message: 'Nouveau patient enregistré - Amina Benali',
      time: '5 min',
      icon: UserCheck,
      color: 'green'
    },
    {
      id: '2',
      type: 'appointment',
      message: 'Rendez-vous confirmé pour 14h00',
      time: '12 min',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: '3',
      type: 'payment',
      message: 'Paiement reçu - 7,500 DA',
      time: '25 min',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: '4',
      type: 'stock',
      message: 'Stock faible - Anesthésique local',
      time: '1 h',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      id: '5',
      type: 'message',
      message: 'Nouveau message du laboratoire',
      time: '2 h',
      icon: MessageSquare,
      color: 'purple'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'urgent': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
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

  const quickActions = [
    { label: 'Nouveau Patient', icon: Users, color: 'blue', path: '/patients' },
    { label: 'Nouveau RDV', icon: Calendar, color: 'green', path: '/appointments' },
    { label: 'Messages', icon: MessageSquare, color: 'purple', path: '/messages' },
    { label: 'Salle d\'Attente', icon: Clock, color: 'orange', path: '/waiting-room' }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Bonjour, {user?.firstname} ! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Voici un aperçu de votre clinique aujourd'hui
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-4 py-2 bg-${action.color}-600 text-white rounded-lg hover:bg-${action.color}-700 transition-colors flex items-center space-x-2`}
            >
              <action.icon className="w-4 h-4" />
              <span className="hidden md:inline">{action.label}</span>
            </motion.button>
          ))}
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
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Rendez-vous d'Aujourd'hui</h2>
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
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {appointment.patient.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{appointment.patient}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{appointment.time}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{appointment.fee}</p>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Activités Récentes</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className={`w-8 h-8 bg-${activity.color}-100 dark:bg-${activity.color}-900/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-4 h-4 text-${activity.color}-600 dark:text-${activity.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Il y a {activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Conseil du Jour 💡</h3>
            <p className="text-blue-100 text-sm mb-4">
              N'oubliez pas de rappeler aux patients leurs rendez-vous de demain pour réduire les absences.
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Envoyer Rappels</span>
              </button>
              <button className="px-4 py-2 bg-blue-400 text-white rounded-lg text-sm font-medium hover:bg-blue-300 transition-colors flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>SMS</span>
              </button>
            </div>
          </div>

          {user?.role === 'doctor' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Mes Statistiques</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Patients aujourd'hui</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Revenus aujourd'hui</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">28,500 DA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Note moyenne</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Temps moyen/patient</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">25 min</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;