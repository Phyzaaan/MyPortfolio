import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { playSound } from '../../utils/sound';

const BrokenHeartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg" 
      width="64"  
      height="64"
      viewBox="0 0 24 24"
    >
      
      <path
        d="M20.42 4.58a5.5 5.5 0 0 0-7.78 0l-1.06 1.06-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"  
        fill="#dc2626" 
        stroke="#7f1d1d" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m12 13-1-1 2-2-3-3 2-2"
        stroke="#450a0a" 
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
);


interface MyHeartProps {
  onClose: () => void;
  isVisible: boolean;
  volume: boolean;
  setBroken: () => void;
}

const HeartPopUp: React.FC<MyHeartProps> = ({ onClose, isVisible, volume, setBroken }) => {
  const [hits, setHits] = useState(1);
  const [message, setMessage] = useState("Please Don't Break My Heart");
  const [isBroken, setIsBroken] = useState(false);
  const [isHurting, setIsHurting] = useState(false);

  const handleHeartClick = () => {
    if (!isBroken) {
      setIsHurting(true);
      setTimeout(() => setIsHurting(false), 200);
    }
    setHits(hits + 1);
    if (hits < 3) {
      playSound('/Sounds/hurt.mp3', { isEnabled: volume });
      setMessage("PLEASE STOP! It Hurts");
    } else {
      setBroken();
      setIsBroken(true);
      playSound('/Sounds/heart-break.mp3', { isEnabled: volume });
      setMessage("You Broke My Heart...");
    }
  };

  const getHeartIcon = () => {
    if (hits < 2) {
      return <Heart className="w-16 h-16 text-red-500 fill-current" />;
    }
    if (hits < 3) {
      return <Heart className="w-16 h-16 text-red-700 fill-current" />;
    } else {
    return<BrokenHeartIcon />;
  }};

  return (
    <div className={`fixed inset-0 bg-[var(--primary-color)]/60 flex items-center justify-center z-[100] ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} transition-all duration-700 ease-in-out`}>
      <div className={`bg-[var(--primary-color)] border-3 border-[var(--border-color)] rounded-lg shadow-xl flex flex-col p-6 text-center items-center ${isVisible ? 'animate-fade-in opacity-100 scale-100' : 'animate-fade-out opacity-0 scale-0'} transition-all duration-700 ease-in-out`}>
        <button
                onClick={handleHeartClick}
                disabled={isBroken}
                className={`
                    p-4 rounded-full focus:outline-none 
                    ${isHurting ? 'animate-shake' : ''}
                    ${hits >= 4 ? 'animate-explode cursor-not-allowed' : 'active:scale-90 transition-transform'}
                `}
            >
                {getHeartIcon()}
            </button>
        <p className='text-xl font-semibold text-[var(--text-color-2)] mb-6 transition-all duration-700 ease-in-out'>{message}</p>
        <button
          onClick={onClose}
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

export default HeartPopUp;