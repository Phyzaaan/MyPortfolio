import React, {useEffect, useState} from 'react';
import { Star } from 'lucide-react'

interface Props {
    paid: boolean;
    darkMode: boolean;
}

interface CloudProps {
  delay: number;
  duration: number;
  top: string;
}



const StarField: React.FC = () => {
  // Add 'size' to the state's type definition
  const [stars, setStars] = useState<{ top: string; left: string; animationDuration: string; animationDelay: string; size: number }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 3}s`,
        // Calculate the size ONCE and store it in state
        size: Math.random() * 2 + 1,
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-[60%] overflow-hidden">
      {stars.map((star, i) => (
        <Star
          key={i}
          className="absolute text-white scale-[2]"
          // Use the stable size from the state
          size={star.size}
          style={{
            top: star.top,
            left: star.left,
            animationName: 'twinkle',
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
            animationTimingFunction: '-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}
    </div>
  );
};


const Cloud: React.FC<CloudProps> = ({ delay, duration, top }) => (
  <div
    className="absolute left-[-10rem] w-32 h-10 bg-white rounded-full opacity-80"
    style={{ animation: `cloud-flow ${duration}s linear infinite`, animationDelay: `${delay}s`, top: `${top}`}}
  >
    <div className="absolute -top-5 left-2 w-10 h-10 bg-white rounded-full"></div>
    <div className="absolute -top-8 right-4 w-18 h-18 bg-white rounded-full"></div>
  </div>
);



const Bg: React.FC<Props> = ({ paid, darkMode}) => {
    // If 'paid' is false, render nothing. This is clean and explicit.
    if (!paid) {
        return null;
    }

    // Otherwise, if 'paid' is true, return the background JSX.
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden transition-all duration-700 ease-in-out">
            <div className={`relative w-full h-full ${darkMode ? 'bg-gray-900' : 'bg-sky-400'} transition-all duration-700 ease-in-out`}>
                <div className="relative w-full h-full">
                    <div className={`sun${darkMode ? ' hide' : ''}`} />
                    <div className={`moon${darkMode ? ' ' : ' hide'}`} />
                    <div className={`clouds${darkMode ? ' hide' : ''}`} /> 
                    <div className={`absolute inset-0 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
                        <StarField />
                    </div>
                    <div className={`absolute inset-0 z-2 ${!darkMode ? 'opacity-100' : 'opacity-0'} transition-all duration-700 ease-in-out`}>
                        <Cloud delay={0} duration={30} top={'30%'} />
                        <Cloud delay={5} duration={40} top={'45%'} />
                        <Cloud delay={15} duration={50} top={'10%'} />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[80%] transition-all duration-700 ease-in-out">
                        <div className={`wave-bg absolute bottom-0 left-0 w-[200%] h-full  ${darkMode ? 'opacity-40' : 'opacity-100'}`}></div>
                        <div className={`wave-bg-2 absolute bottom-0 left-0 w-[200%] h-full  ${darkMode ? 'opacity-30' : 'opacity-100'}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bg;