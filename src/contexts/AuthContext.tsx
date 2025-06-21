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

// Mock users for demonstration
const mockUsers: User[] = [
  {
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
    updatedAt: new Date()
  },
  {
    id: '2',
    firstname: 'Ahmed',
    lastname: 'Alami',
    phone: '0662345678',
    email: 'ahmed.alami@clinic.ma',
    gender: 'male',
    role: 'admin_medical',
    username: 'admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    firstname: 'Fatima',
    lastname: 'Zahra',
    phone: '0663456789',
    email: 'fatima.zahra@clinic.ma',
    gender: 'female',
    role: 'receptionist',
    username: 'reception',
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
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
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
    
    // Role-based permissions
    const rolePermissions: Record<UserRole, string[]> = {
      admin_medical: ['all'],
      admin_administrative: ['all'],
      doctor: ['dashboard', 'patients', 'appointments', 'medical_files', 'prescriptions', 'waiting_room'],
      receptionist: ['dashboard', 'patients', 'appointments', 'billing', 'waiting_room'],
      assistant: ['dashboard', 'patients', 'medical_files'],
      call_center: ['dashboard', 'patients', 'appointments'],
      radiologist: ['dashboard', 'patients', 'radiology'],
      photograph: ['dashboard', 'patients', 'photos'],
      lab_agent: ['dashboard', 'patients', 'lab_results']
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