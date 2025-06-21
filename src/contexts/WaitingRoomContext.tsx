import React, { createContext, useContext, useState, useEffect } from 'react';
import { Patient, Doctor } from '../types';

interface WaitingRoomCall {
  id: string;
  patient: Patient;
  doctor: Doctor;
  cabinetNumber: string;
  timestamp: Date;
}

interface WaitingRoomContextType {
  currentCall: WaitingRoomCall | null;
  callHistory: WaitingRoomCall[];
  callNextPatient: (patient: Patient, doctor: Doctor, cabinetNumber: string) => void;
  playNotificationSound: () => void;
}

const WaitingRoomContext = createContext<WaitingRoomContextType | undefined>(undefined);

export const useWaitingRoom = () => {
  const context = useContext(WaitingRoomContext);
  if (context === undefined) {
    throw new Error('useWaitingRoom must be used within a WaitingRoomProvider');
  }
  return context;
};

export const WaitingRoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCall, setCurrentCall] = useState<WaitingRoomCall | null>(null);
  const [callHistory, setCallHistory] = useState<WaitingRoomCall[]>([]);

  const playNotificationSound = () => {
    // Create audio context for notification sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a simple notification tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const callNextPatient = (patient: Patient, doctor: Doctor, cabinetNumber: string) => {
    const newCall: WaitingRoomCall = {
      id: Date.now().toString(),
      patient,
      doctor,
      cabinetNumber,
      timestamp: new Date()
    };

    setCurrentCall(newCall);
    setCallHistory(prev => [newCall, ...prev.slice(0, 4)]); // Keep last 5 calls
    playNotificationSound();

    // Auto-clear current call after 30 seconds
    setTimeout(() => {
      setCurrentCall(null);
    }, 30000);
  };

  return (
    <WaitingRoomContext.Provider value={{
      currentCall,
      callHistory,
      callNextPatient,
      playNotificationSound
    }}>
      {children}
    </WaitingRoomContext.Provider>
  );
};