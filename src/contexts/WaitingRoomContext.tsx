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
    // Create audio context for enhanced notification sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a more pleasant and longer notification sequence
    const playTone = (frequency: number, startTime: number, duration: number, volume: number = 0.3) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sine'; // Smoother sine wave
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(volume * 0.8, startTime + duration - 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const currentTime = audioContext.currentTime;
    
    // Play a pleasant 3-tone chime sequence (longer duration)
    playTone(523.25, currentTime, 0.8, 0.4); // C5
    playTone(659.25, currentTime + 0.3, 0.8, 0.4); // E5
    playTone(783.99, currentTime + 0.6, 1.2, 0.4); // G5
    
    // Add a second sequence for emphasis
    setTimeout(() => {
      const secondTime = audioContext.currentTime;
      playTone(523.25, secondTime, 0.6, 0.3);
      playTone(659.25, secondTime + 0.2, 0.6, 0.3);
      playTone(783.99, secondTime + 0.4, 0.8, 0.3);
    }, 2000);
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

    // Auto-clear current call after 45 seconds (increased from 30)
    setTimeout(() => {
      setCurrentCall(null);
    }, 45000);
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