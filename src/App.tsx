import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { WaitingRoomProvider } from './contexts/WaitingRoomContext';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import PatientList from './components/Patients/PatientList';
import AppointmentList from './components/Appointments/AppointmentList';
import WaitingRoomDisplay from './components/WaitingRoom/WaitingRoomDisplay';
import StatisticsPage from './components/Statistics/StatisticsPage';
import InventoryPage from './components/Inventory/InventoryPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Layout>
                <PatientList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Layout>
                <AppointmentList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/waiting-room"
          element={
            <ProtectedRoute>
              <WaitingRoomDisplay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Layout>
                <StatisticsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Layout>
                <InventoryPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/medical-files"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dossiers Médicaux</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Section en cours de développement...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/prescriptions"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Prescriptions</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Section en cours de développement...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lab-results"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Résultats de Laboratoire</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Section en cours de développement...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/radiology"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Radiologie</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Section en cours de développement...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Facturation</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Section en cours de développement...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestion du Personnel</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Section en cours de développement...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Messages</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Section en cours de développement...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Paramètres</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Section en cours de développement...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WaitingRoomProvider>
          <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid var(--toast-border)',
                },
              }}
            />
          </div>
        </WaitingRoomProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;