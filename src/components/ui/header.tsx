import React from 'react';
import {Volume2, VolumeX, Sun, Moon, X} from 'lucide-react'
import { playSound, stopAllSounds } from '../../utils/sound';
import btnPressSound from '/Sounds/btn-press.mp3'
import swooshSound from '/Sounds/swoosh.mp3'

interface Props {
  title: string;
  paid: boolean;
  darkMode: boolean;
  volume: boolean;
  setDarkMode: (value: boolean) => void; 
  setVolume: (value: boolean) => void;   
  setShowModal: (value: boolean) => void; 
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

  return (
    <header className={`p-2 flex justify-between z-40 items-center border-b-3 border-[var(--border-color)] font-semibold ${paid ? 'bg-[var(--secondary-color)] ' : 'bg-gray-300'}`}>
      <h2 className={`tracking-wide text-2xl `}>{title}</h2>
      <nav className="flex gap-2">
        <button
          onClick={() => {
            if (paid) {
              playSound(btnPressSound, { isEnabled: volume })
                playSound(swooshSound, { isEnabled: volume, time: 0.2 })
              setDarkMode(!darkMode);
            } else {
              setShowModal(true);
            }
          }}
          className={`px-3 py-2 flex items-center justify-center ${paid
            ? 'bg-[var(--btn-color)] hover:bg-[var(--btn-color)]/50 rounded-md border border-[var(--border-color)] shadow-[1px_3px_0_1px_var(--text-color)] active:translate-y-1 active:shadow-none transition-transform duration-100 ease-in-out'
            : 'border border-gray-400 bg-gray-200 rounded-md'}
             ${closeBtn ? 'translate-x-0 ' : 'translate-x-14'} `}
            name='theme-toggle'
        >
          {darkMode ? <Moon className="h-6 w-6 " /> : <Sun className="h-6 w-6 " />}
        </button>
        <button
          onClick={() => {
            if (paid) {
              setVolume(!volume);
              if (volume) { stopAllSounds() }
              playSound(btnPressSound, { isEnabled: !volume })
            } else {
              setShowModal(true);
            }
          }}
          className={`px-3 flex items-center justify-center ${paid
            ? 'bg-[var(--btn-color)] hover:bg-[var(--btn-color)]/50 rounded-md border border-[var(--border-color)] shadow-[1px_3px_0_1px_var(--text-color)] active:translate-y-1 active:shadow-none transition-transform duration-100 ease-in-out'
            : 'border border-gray-400 bg-gray-200 rounded-md'}
             ${closeBtn ? 'translate-x-0 ' : 'translate-x-14'}`} 
            name='Volume-toggle'
        >
           {volume ? <Volume2 className="h-6 w-6 " /> : <VolumeX className="h-6 w-6 " />}
        </button>
        <button
          onClick={closeWindow}
          className={`px-3 flex items-center justify-center bg-[var(--btn-color)] hover:bg-[var(--btn-color)]/50 rounded-md border border-[var(--border-color)] shadow-[1px_3px_0_1px_var(--text-color)] active:translate-y-1 active:shadow-none transition-transform duration-100 ease-in-out
            ${closeBtn ? 'translate-x-0 ' : 'translate-x-20 pointer-events-none'}`} 
            name='Close-window'
        >
          <X className="h-6 w-6 " />
        </button>
      </nav>
    </header>
  );
};

export default Header;