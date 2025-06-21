import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar,
  Users,
  FileText,
  DollarSign,
  Package,
  BarChart,
  Settings,
  MessageSquare,
  Activity,
  UserCheck,
  Stethoscope,
  Pill,
  Camera,
  TestTube,
  Home,
  Monitor,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, hasAccess } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Tableau de bord', path: '/dashboard', permission: 'dashboard' },
    { icon: Users, label: 'Patients', path: '/patients', permission: 'patients' },
    { icon: Calendar, label: 'Rendez-vous', path: '/appointments', permission: 'appointments' },
    { icon: FileText, label: 'Dossiers médicaux', path: '/medical-files', permission: 'medical_files' },
    { icon: Pill, label: 'Prescriptions', path: '/prescriptions', permission: 'prescriptions' },
    { icon: TestTube, label: 'Résultats de labo', path: '/lab-results', permission: 'lab_results' },
    { icon: Camera, label: 'Radiologie', path: '/radiology', permission: 'radiology' },
    { icon: DollarSign, label: 'Facturation', path: '/billing', permission: 'billing' },
    { icon: Package, label: 'Inventaire', path: '/inventory', permission: 'inventory' },
    { icon: UserCheck, label: 'Personnel', path: '/staff', permission: 'staff' },
    { icon: MessageSquare, label: 'Messages', path: '/messages', permission: 'messages' },
    { icon: BarChart, label: 'Statistiques', path: '/statistics', permission: 'statistics' },
    { icon: Monitor, label: 'Salle d\'attente', path: '/waiting-room', permission: 'waiting_room' },
    { icon: Settings, label: 'Paramètres', path: '/settings', permission: 'settings' }
  ];

  const filteredMenuItems = menuItems.filter(item => hasAccess(item.permission));

  return (
    <>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg z-50 w-64 border-r border-gray-200 dark:border-gray-700 transition-colors duration-200"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Clinique Dentaire</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Système ERP</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.firstname.charAt(0)}{user?.lastname.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">{user?.firstname} {user?.lastname}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{user?.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-full pb-20">
          {filteredMenuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 group ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                      : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;