import React from 'react';
import { playSound } from '../../utils/sound'; 
import btnPressSound from '/Sounds/btn-press.mp3';

interface CustomAlertProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  volume: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ isVisible, message, onClose, volume }) => {

  const handleClose = () => {
    // Play a little 'close' sound to make it feel nice
    playSound(btnPressSound, { isEnabled: volume });
    onClose();
  };

  return (
    // A backdrop to dim the rest of the page, makin' the alert feel important!
    <div className={`fixed inset-0 bg-[var(--primary-color)]/60 flex items-center justify-center z-[100] ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} transition-all duration-700 ease-in-out`}>
        
      {/* The pop-up itself with your amazing theme! */}
      <div className={`bg-[var(--primary-color)] border-3 border-[var(--border-color)] rounded-lg shadow-xl flex flex-col p-6 text-center ${isVisible ? 'animate-fade-in opacity-100 scale-100' : 'animate-fade-out opacity-0 scale-0'} transition-all duration-700 ease-in-out`}>
        
        <p className="text-xl font-semibold text-[var(--text-color-2)] mb-6 transition-all duration-700 ease-in-out">
          {message}
        </p>

        <button
          onClick={handleClose}
          className="w-1/2 mx-auto bg-[var(--btn-color)] text-[var(--text-color)] font-bold py-2 rounded-lg border-2 border-[var(--border-color)]
                     shadow-[0_4px_0px_var(--shadow)] hover:bg-white/20
                     active:translate-y-0.5 active:shadow-[0_2px_0px_var(--shadow)]
                     transition-all duration-150 ease-in-out"
        >
          <span className='transition-all duration-700 ease-in-out'>OK</span>
        </button>

      </div>
    </div>
  );
};

export default CustomAlert;