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
  X,
  Phone,
  Bell,
  User,
  Lock,
  Star,
  RefreshCw,
  Scan,
  Shield,
  Database,
  FileImage,
  Clipboard,
  Clock,
  MapPin,
  Headphones
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
    // Core Dashboard
    { icon: Home, label: 'Tableau de bord', path: '/dashboard', permission: 'dashboard' },
    
    // Patient Management
    { icon: Users, label: 'Patients', path: '/patients', permission: 'patients' },
    { icon: Calendar, label: 'Rendez-vous', path: '/appointments', permission: 'appointments' },
    { icon: Monitor, label: 'Salle d\'attente', path: '/waiting-room', permission: 'waiting_room' },
    
    // Medical Records & Files
    { icon: FileText, label: 'Dossiers médicaux', path: '/medical-files', permission: 'medical_files' },
    { icon: Clipboard, label: 'Historique consultations', path: '/consultation-history', permission: 'consultation_history' },
    { icon: Pill, label: 'Prescriptions', path: '/prescriptions', permission: 'prescriptions' },
    
    // Diagnostic & Results
    { icon: TestTube, label: 'Résultats de labo', path: '/lab-results', permission: 'lab_results' },
    { icon: Camera, label: 'Radiologie', path: '/radiology', permission: 'radiology' },
    { icon: FileImage, label: 'Images de cas', path: '/case-images', permission: 'case_images' },
    
    // Financial Management
    { icon: DollarSign, label: 'Facturation', path: '/billing', permission: 'billing' },
    { icon: Activity, label: 'Mes paiements', path: '/my-payments', permission: 'my_payments' },
    
    // Inventory & Stock
    { icon: Package, label: 'Inventaire', path: '/inventory', permission: 'inventory' },
    { icon: Scan, label: 'Scanner médicaments', path: '/medication-scanner', permission: 'medication_scanner' },
    
    // Communication & Messaging
    { icon: MessageSquare, label: 'Messages internes', path: '/messages', permission: 'messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications', permission: 'notifications' },
    { icon: Phone, label: 'Journal d\'appels', path: '/call-log', permission: 'call_log' },
    { icon: Headphones, label: 'Centre d\'appels', path: '/call-center', permission: 'call_center' },
    
    // Staff & User Management
    { icon: UserCheck, label: 'Personnel', path: '/staff', permission: 'staff' },
    { icon: Shield, label: 'Rôles & permissions', path: '/roles-permissions', permission: 'roles_permissions' },
    
    // Statistics & Reports
    { icon: BarChart, label: 'Statistiques', path: '/statistics', permission: 'statistics' },
    { icon: Star, label: 'Évaluations patients', path: '/patient-feedback', permission: 'patient_feedback' },
    
    // Room & Cabinet Management
    { icon: MapPin, label: 'Gestion des cabinets', path: '/room-management', permission: 'room_management' },
    { icon: Clock, label: 'Mon planning', path: '/my-schedule', permission: 'my_schedule' },
    
    // System & Configuration
    { icon: Settings, label: 'Paramètres', path: '/settings', permission: 'settings' },
    { icon: Database, label: 'Sauvegarde système', path: '/system-backup', permission: 'system_backup' },
    { icon: RefreshCw, label: 'Synchronisation', path: '/sync', permission: 'sync' },
    
    // Profile & Security
    { icon: User, label: 'Mon profil', path: '/my-profile', permission: 'my_profile' },
    { icon: Lock, label: 'Changer mot de passe', path: '/change-password', permission: 'change_password' },
  ];

  const filteredMenuItems = menuItems.filter(item => hasAccess(item.permission));

  // Group menu items by category for better organization
  const menuCategories = [
    {
      title: 'Principal',
      items: filteredMenuItems.filter(item => 
        ['dashboard', 'patients', 'appointments', 'waiting_room'].includes(item.permission)
      )
    },
    {
      title: 'Médical',
      items: filteredMenuItems.filter(item => 
        ['medical_files', 'consultation_history', 'prescriptions', 'lab_results', 'radiology', 'case_images'].includes(item.permission)
      )
    },
    {
      title: 'Financier',
      items: filteredMenuItems.filter(item => 
        ['billing', 'my_payments'].includes(item.permission)
      )
    },
    {
      title: 'Inventaire',
      items: filteredMenuItems.filter(item => 
        ['inventory', 'medication_scanner'].includes(item.permission)
      )
    },
    {
      title: 'Communication',
      items: filteredMenuItems.filter(item => 
        ['messages', 'notifications', 'call_log', 'call_center'].includes(item.permission)
      )
    },
    {
      title: 'Gestion',
      items: filteredMenuItems.filter(item => 
        ['staff', 'roles_permissions', 'room_management', 'my_schedule'].includes(item.permission)
      )
    },
    {
      title: 'Rapports',
      items: filteredMenuItems.filter(item => 
        ['statistics', 'patient_feedback'].includes(item.permission)
      )
    },
    {
      title: 'Système',
      items: filteredMenuItems.filter(item => 
        ['settings', 'system_backup', 'sync'].includes(item.permission)
      )
    },
    {
      title: 'Profil',
      items: filteredMenuItems.filter(item => 
        ['my_profile', 'change_password'].includes(item.permission)
      )
    }
  ].filter(category => category.items.length > 0);

  return (
    <>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg z-50 w-80 border-r border-gray-200 dark:border-gray-700 transition-colors duration-200 overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Clinique Dentaire</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Système ERP Complet</p>
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {user?.firstname.charAt(0)}{user?.lastname.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">{user?.firstname} {user?.lastname}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{user?.role.replace('_', ' ')}</p>
              {user?.role === 'doctor' && (
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">4.8 • 156 patients</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-6 pb-20">
          {menuCategories.map((category, categoryIndex) => (
            <div key={category.title}>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {category.title}
              </h3>
              <div className="space-y-1">
                {category.items.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                    >
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                          isActive 
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm' 
                            : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`} />
                        <span className="font-medium text-sm">{item.label}</span>
                        {isActive && (
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full ml-auto"></div>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
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