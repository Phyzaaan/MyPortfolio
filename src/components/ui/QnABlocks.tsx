import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface QnABlockProps {
  title: string;
  content: React.ReactNode;
  volume: boolean;
}
// A reusable component for the Q&A blocks inside the window
const QnABlock: React.FC<QnABlockProps> = ({
  title,
  content,
  volume,
}) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="bg-[var(--secondary-color)] rounded-lg p-2 border-2 border-[var(--border-color)] transition-all duration-700 ease-in-out">
      <button
        onClick={() => {
          setIsOpen(!isOpen); 
          if (isOpen) {
          playSound('/Sounds/pop-in.mp3', { isEnabled: volume})
          } else {
            playSound('/Sounds/pop-out.mp3', { isEnabled: volume})
          }
      }}
        className="flex items-center justify-between w-full p-2 text-[var(--text-color-2)] hover:bg-[var(--secondary-color-2)] hover:text-[var(--text-color)] transition-all duration-700 ease-in-out"
      >
        <h3 className="font-bold text-lg text-[var(--text-color-2)] transition-all duration-700 ease-in-out">{title}</h3>
        <ChevronDown className={`w-5 h-5 ${isOpen ? "rotate-180" : ""} transition-all duration-700 ease-in-out`} />
      </button>

      <div
        className={` grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-150 ease-in-out`}
      >
        <div className="overflow-hidden">
          <p className="text-[var(--text-color)] px-3 pb-3 transition-all duration-700 ease-in-out">{content}</p>
        </div>
      </div>
    </div>
  );
};

// This line makes the component available to be imported in other files
export default QnABlock;