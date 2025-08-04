import React from 'react';
import {Volume2, VolumeX, Sun, Moon, X} from 'lucide-react'
import { playSound, stopAllSounds } from '../../utils/sound';

interface Props {
  title: string;
  paid: boolean;
  darkMode: boolean;
  volume: boolean;
  setDarkMode: (value: boolean) => void; // A function that takes a boolean
  setVolume: (value: boolean) => void;   // A function that takes a boolean
  setShowModal: (value: boolean) => void; // A function that takes a boolean
  closeWindow: () => void;
  closeBtn: boolean;
}



const Header: React.FC<Props> = ({
  title,
  paid,
  darkMode,
  volume,
  setDarkMode,
  setVolume,
  setShowModal,
  closeWindow,
  closeBtn
}) => {

  // We will paste the JSX in here
  return (
    <header className={`p-2 flex justify-between z-40 items-center border-b-3 border-[var(--border-color)] font-semibold ${paid ? 'bg-[var(--secondary-color)] transition-all duration-700 ease-in-out' : 'bg-gray-300'}`}>
      <h2 className={`tracking-wide text-2xl transition-all duration-700 ease-in-out`}>{title}</h2>
      <nav className="flex gap-2">
        <button
          onClick={() => {
            if (paid) {
              playSound('/Sounds/btn-press.mp3', { isEnabled: volume })
              playSound('/Sounds/swoosh.mp3', { isEnabled: volume })
              setDarkMode(!darkMode);
            } else {
              setShowModal(true);
            }
          }}
          className={`px-3 py-2 flex items-center justify-center ${paid
            ? 'bg-[var(--btn-color)] hover:bg-[var(--btn-color)]/50 rounded-md border border-[var(--border-color)] shadow-[1px_3px_0_1px_var(--text-color)] active:translate-y-1 active:shadow-none transition-all duration-150 ease-in-out'
            : 'border border-gray-400 bg-gray-200 rounded-md'}
             ${closeBtn ? 'translate-x-0 ' : 'translate-x-14'}`}
            name='theme-toggle'
        >
          {darkMode ? <Moon className="h-6 w-6 transition-all duration-700 ease-in-out" /> : <Sun className="h-6 w-6 transition-all duration-700 ease-in-out" />}
        </button>
        <button
          onClick={() => {
            if (paid) {
              setVolume(!volume);
              if (volume) { stopAllSounds() }
              playSound('/Sounds/btn-press.mp3', { isEnabled: !volume })
            } else {
              setShowModal(true);
            }
          }}
          className={`px-3 flex items-center justify-center ${paid
            ? 'bg-[var(--btn-color)] hover:bg-[var(--btn-color)]/50 rounded-md border border-[var(--border-color)] shadow-[1px_3px_0_1px_var(--text-color)] active:translate-y-1 active:shadow-none transition-all duration-150 ease-in-out'
            : 'border border-gray-400 bg-gray-200 rounded-md'}
             ${closeBtn ? 'translate-x-0 ' : 'translate-x-14'}`} 
            name='Volume-toggle'
        >
           {volume ? <Volume2 className="h-6 w-6 transition-all duration-700 ease-in-out" /> : <VolumeX className="h-6 w-6 transition-all duration-700 ease-in-out" />}
        </button>
        <button
          onClick={closeWindow}
          className={`px-3 flex items-center justify-center bg-[var(--btn-color)] hover:bg-[var(--btn-color)]/50 rounded-md border border-[var(--border-color)] shadow-[1px_3px_0_1px_var(--text-color)] active:translate-y-1 active:shadow-none transition-all duration-150 ease-in-out
            ${closeBtn ? 'translate-x-0 ' : 'translate-x-20 pointer-events-none'}`} 
            name='Close-window'
        >
          <X className="h-6 w-6 transition-all duration-700 ease-in-out" />
        </button>
      </nav>
    </header>
  );
};

// This line makes the component available to be imported in other files
export default Header;