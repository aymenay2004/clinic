import React, { createContext, useContext, useState, useEffect } from 'react';
import { Patient, Doctor, WaitingRoomCall, WaitingRoomSettings } from '../types';

interface WaitingRoomContextType {
  currentCall: WaitingRoomCall | null;
  callHistory: WaitingRoomCall[];
  settings: WaitingRoomSettings;
  callNextPatient: (patient: Patient, doctor: Doctor, cabinetNumber: string) => void;
  updateSettings: (settings: Partial<WaitingRoomSettings>) => void;
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
  const [settings, setSettings] = useState<WaitingRoomSettings>({
    displayMode: 'first_name_only',
    autoRefreshInterval: 5,
    soundEnabled: true,
    animationEnabled: true,
    showQueueNumber: false,
    showEstimatedTime: false
  });

  const playNotificationSound = () => {
    if (!settings.soundEnabled) return;

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
    
    // Play a pleasant 4-tone chime sequence (longer duration - 6 seconds total)
    playTone(523.25, currentTime, 1.0, 0.4); // C5
    playTone(659.25, currentTime + 0.4, 1.0, 0.4); // E5
    playTone(783.99, currentTime + 0.8, 1.2, 0.4); // G5
    playTone(1046.50, currentTime + 1.2, 1.0, 0.3); // C6
    
    // Add a second sequence for emphasis (after 2.5 seconds)
    setTimeout(() => {
      const secondTime = audioContext.currentTime;
      playTone(523.25, secondTime, 0.8, 0.3);
      playTone(659.25, secondTime + 0.3, 0.8, 0.3);
      playTone(783.99, secondTime + 0.6, 1.0, 0.3);
    }, 2500);

    // Add a final gentle reminder tone (after 5 seconds)
    setTimeout(() => {
      const thirdTime = audioContext.currentTime;
      playTone(659.25, thirdTime, 0.6, 0.2);
      playTone(783.99, thirdTime + 0.3, 0.8, 0.2);
    }, 5000);
  };

  const callNextPatient = (patient: Patient, doctor: Doctor, cabinetNumber: string) => {
    const newCall: WaitingRoomCall = {
      id: Date.now().toString(),
      patient,
      doctor,
      cabinetNumber,
      timestamp: new Date(),
      isAnonymized: settings.displayMode === 'anonymous'
    };

    setCurrentCall(newCall);
    setCallHistory(prev => [newCall, ...prev.slice(0, 9)]); // Keep last 10 calls
    playNotificationSound();

    // Auto-clear current call after 60 seconds (increased for better visibility)
    setTimeout(() => {
      setCurrentCall(null);
    }, 60000);
  };

  const updateSettings = (newSettings: Partial<WaitingRoomSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    localStorage.setItem('waitingRoomSettings', JSON.stringify({ ...settings, ...newSettings }));
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('waitingRoomSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <WaitingRoomContext.Provider value={{
      currentCall,
      callHistory,
      settings,
      callNextPatient,
      updateSettings,
      playNotificationSound
    }}>
      {children}
    </WaitingRoomContext.Provider>
  );
};