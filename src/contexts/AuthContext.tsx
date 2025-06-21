import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Doctor } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  hasAccess: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration with comprehensive roles
const mockUsers: User[] = [
  {
    id: '1',
    firstname: 'Dr. Sarah',
    lastname: 'Benali',
    phone: '0661234567',
    email: 'sarah.benali@clinic.dz',
    gender: 'female',
    role: 'doctor',
    username: 'dr.benali',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    preferences: {
      theme: 'light',
      language: 'fr',
      notifications: {
        email: true,
        sms: true,
        push: true,
        sound: true
      },
      dashboard: {
        layout: 'grid',
        widgets: ['appointments', 'patients', 'revenue', 'notifications']
      }
    }
  },
  {
    id: '2',
    firstname: 'Ahmed',
    lastname: 'Alami',
    phone: '0662345678',
    email: 'ahmed.alami@clinic.dz',
    gender: 'male',
    role: 'admin_medical',
    username: 'admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    preferences: {
      theme: 'dark',
      language: 'fr',
      notifications: {
        email: true,
        sms: true,
        push: true,
        sound: true
      },
      dashboard: {
        layout: 'list',
        widgets: ['statistics', 'staff', 'inventory', 'revenue']
      }
    }
  },
  {
    id: '3',
    firstname: 'Fatima',
    lastname: 'Zahra',
    phone: '0663456789',
    email: 'fatima.zahra@clinic.dz',
    gender: 'female',
    role: 'receptionist',
    username: 'reception',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    preferences: {
      theme: 'light',
      language: 'fr',
      notifications: {
        email: true,
        sms: true,
        push: true,
        sound: true
      },
      dashboard: {
        layout: 'grid',
        widgets: ['appointments', 'waiting_room', 'patients', 'billing']
      }
    }
  },
  {
    id: '4',
    firstname: 'Youssef',
    lastname: 'Mansouri',
    phone: '0664567890',
    email: 'youssef.mansouri@clinic.dz',
    gender: 'male',
    role: 'call_center',
    username: 'callcenter',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    firstname: 'Amina',
    lastname: 'Benaissa',
    phone: '0665678901',
    email: 'amina.benaissa@clinic.dz',
    gender: 'female',
    role: 'lab_agent',
    username: 'lab',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    firstname: 'Karim',
    lastname: 'Boumediene',
    phone: '0666789012',
    email: 'karim.boumediene@clinic.dz',
    gender: 'male',
    role: 'radiologist',
    username: 'radio',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    firstname: 'Nadia',
    lastname: 'Cherif',
    phone: '0667890123',
    email: 'nadia.cherif@clinic.dz',
    gender: 'female',
    role: 'photograph',
    username: 'photo',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    firstname: 'Omar',
    lastname: 'Khelifi',
    phone: '0668901234',
    email: 'omar.khelifi@clinic.dz',
    gender: 'male',
    role: 'stock_manager',
    username: 'stock',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === '123456') {
      const updatedUser = { ...foundUser, lastLogin: new Date() };
      setUser(updatedUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const hasAccess = (permission: string): boolean => {
    if (!user) return false;
    
    // Admin has access to everything
    if (user.role === 'admin_medical' || user.role === 'admin_administrative') {
      return true;
    }
    
    // Comprehensive role-based permissions
    const rolePermissions: Record<UserRole, string[]> = {
      admin_medical: ['all'],
      admin_administrative: ['all'],
      
      doctor: [
        'dashboard', 'patients', 'appointments', 'medical_files', 'consultation_history',
        'prescriptions', 'lab_results', 'radiology', 'case_images', 'my_payments',
        'medication_scanner', 'messages', 'notifications', 'patient_feedback',
        'my_schedule', 'waiting_room', 'my_profile', 'change_password'
      ],
      
      receptionist: [
        'dashboard', 'patients', 'appointments', 'billing', 'waiting_room',
        'call_log', 'room_management', 'messages', 'notifications',
        'my_profile', 'change_password'
      ],
      
      assistant: [
        'dashboard', 'patients', 'medical_files', 'consultation_history',
        'messages', 'notifications', 'my_profile', 'change_password'
      ],
      
      call_center: [
        'dashboard', 'patients', 'appointments', 'call_log', 'call_center',
        'messages', 'notifications', 'my_profile', 'change_password'
      ],
      
      radiologist: [
        'dashboard', 'patients', 'radiology', 'medical_files', 'messages',
        'notifications', 'my_profile', 'change_password'
      ],
      
      photograph: [
        'dashboard', 'patients', 'case_images', 'medical_files', 'messages',
        'notifications', 'my_profile', 'change_password'
      ],
      
      lab_agent: [
        'dashboard', 'patients', 'lab_results', 'medical_files', 'messages',
        'notifications', 'my_profile', 'change_password'
      ],
      
      stock_manager: [
        'dashboard', 'inventory', 'medication_scanner', 'messages',
        'notifications', 'statistics', 'my_profile', 'change_password'
      ]
    };
    
    return rolePermissions[user.role]?.includes(permission) || 
           rolePermissions[user.role]?.includes('all');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    hasAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};