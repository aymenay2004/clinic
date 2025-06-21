import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  User, 
  MapPin, 
  Clock,
  Stethoscope,
  Volume2
} from 'lucide-react';
import { useWaitingRoom } from '../../contexts/WaitingRoomContext';

const WaitingRoomDisplay: React.FC = () => {
  const { currentCall, callHistory } = useWaitingRoom();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Clinique Dentaire</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">Salle d'Attente</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 inline-block">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{formatTime(currentTime)}</p>
              </div>
              <div className="w-px h-16 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <p className="text-lg text-gray-600 dark:text-gray-400">{formatDate(currentTime)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Call */}
        <AnimatePresence mode="wait">
          {currentCall ? (
            <motion.div
              key={currentCall.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-2xl p-12 mb-12 text-white"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Volume2 className="w-12 h-12" />
                </motion.div>
                
                <h2 className="text-2xl font-semibold mb-4">Appel en cours</h2>
                
                <div className="bg-white bg-opacity-20 rounded-xl p-8 mb-6">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <User className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-4xl font-bold mb-2">
                        {currentCall.patient.firstname} {currentCall.patient.lastname}
                      </h3>
                      <p className="text-xl opacity-90">Patient</p>
                    </div>
                    
                    <div className="w-px h-32 bg-white bg-opacity-30"></div>
                    
                    <div className="text-center">
                      <MapPin className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-4xl font-bold mb-2">{currentCall.cabinetNumber}</h3>
                      <p className="text-xl opacity-90">
                        Dr. {currentCall.doctor.firstname} {currentCall.doctor.lastname}
                      </p>
                    </div>
                  </div>
                </div>
                
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xl"
                >
                  Veuillez vous diriger vers le cabinet indiqué
                </motion.p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 mb-12 text-center"
            >
              <Monitor className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                En attente du prochain appel
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Veuillez patienter, vous serez appelé(e) prochainement
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call History */}
        {callHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Derniers Appels
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {callHistory.slice(0, 6).map((call, index) => (
                <motion.div
                  key={call.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {call.patient.firstname} {call.patient.lastname}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {call.cabinetNumber}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Dr. {call.doctor.firstname} {call.doctor.lastname}</p>
                    <p>{call.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-4">
              Instructions pour les Patients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-800 dark:text-blue-400">
              <div>
                <Volume2 className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Écoutez les annonces</p>
                <p className="text-sm">Un signal sonore accompagne chaque appel</p>
              </div>
              <div>
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Vérifiez le cabinet</p>
                <p className="text-sm">Le numéro du cabinet est affiché clairement</p>
              </div>
              <div>
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Soyez ponctuel</p>
                <p className="text-sm">Présentez-vous rapidement au cabinet indiqué</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WaitingRoomDisplay;