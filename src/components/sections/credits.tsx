import React, { useState } from "react";
import { Heart } from 'lucide-react';

import vite from '/svgs/vite.svg';
import react from '/svgs/react.svg';
import typescript from '/svgs/typescript.svg';
import tailwindcss from '/svgs/tailwindcss.svg';
import emailJS from '/svgs/emailJS.webp';
import firebase from '/svgs/firebase.webp';

import HeartPopUp from "./MyHeart";
import { playSound, stopAllSounds } from "../../utils/sound";

interface Props {
    isVisible: boolean;
    bgMusic: string;
    volume: boolean;
    broken: () => void;
}





const Credits: React.FC<Props> = ({ isVisible, bgMusic, volume, broken }) => {
    const [showHeart, setShowHeart] = useState(false);
    const [hover, setHover] = useState('');

    // Add this helper inside your component:
    function handleLogoHover(logo: string, soundPath: string, speed: number) {
        setHover(logo);
        playSound(soundPath, { isEnabled: volume, speed });
    }




    const logoIcon = `h-10 w-10 translate-y-2 group-hover:scale-120 group-hover:translate-y-0 transition-all duration-300 ease-in-out`;
    const logoName = `text-sm text-[var(--text-color)]/70 opacity-0 scale-80 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-1 transition-all duration-300 ease-in-out`;
    const iconHover = `scale-120 translate-y-0`;
    const logoHover = `opacity-100 scale-100 translate-y-1`;

    return (
        <section
            className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] overflow-hidden flex flex-col transition-all duration-700 ease-in-out
            ${isVisible ? 'top-[60px]' : 'top-[600px]'}`}
        >

            {/* --- WINDOW CONTENT --- */}
            <div className="flex-grow flex flex-col justify-between items-center p-6 text-center text-[var(--text-color)] transition-all duration-700 ease-in-out">

                {/* Top Text Block */}
                <div>
                    <h3 className="text-3xl font-bold italic transition-all duration-700 ease-in-out">Inspired by</h3>
                    <a href="https://www.sharyap.com/" target="_blank" className="text-lg text-[var(--text-color)]/70 transition-all duration-700 ease-in-out">Shar's Desktop</a>
                </div>

                {/* --- NEW: "Built With" Section --- */}
                <div>
                    <h3 className="text-3xl font-bold italic mb-3 transition-all duration-700 ease-in-out">Built With</h3>
                    {/* A container for the technology icons */}
                    <div className="flex justify-center items-center text-center gap-6 transition-all duration-700 ease-in-out">
                        <div
                            onMouseEnter={() => handleLogoHover('R', '/Sounds/pop.mp3', 1.2)}
                            className="group w-15 flex flex-col justify-center items-center"
                        >
                            <img src={react} className={`${logoIcon} ${hover === 'R' ? iconHover : ''}`} alt="React Logo" />
                            <p className={`${logoName} ${hover === 'R' ? logoHover : ''}`}>REACT</p>
                        </div>
                        <div
                            onMouseEnter={() => handleLogoHover('V', '/Sounds/pop.mp3', 1.2)}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-700 ease-in-out"
                        >
                            <img src={vite} className={`${logoIcon} ${hover === 'V' ? iconHover : ''}`} alt="Vite Logo" />
                            <p className={`${logoName} ${hover === 'V' ? logoHover : ''}`}>Vite</p>
                        </div>
                        <div
                            onMouseEnter={() => handleLogoHover('TWS', '/Sounds/pop.mp3', 1.4)}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-700 ease-in-out"
                        >
                            <img src={tailwindcss} className={`${logoIcon} ${hover === 'TWS' ? iconHover : ''}`} alt="Tailwind css Logo" />
                            <p className={`${logoName} ${hover === 'TWS' ? logoHover : ''}`}>Tailwindcss</p>
                        </div>

                        <div
                            onMouseEnter={() => handleLogoHover('TS', '/Sounds/pop.mp3', 1.6)}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-700 ease-in-out"
                        >
                            <img src={typescript} className={`${logoIcon} ${hover === 'TS' ? iconHover : ''}`} alt="TypeScript Logo" />
                            <p className={`${logoName} ${hover === 'TS' ? logoHover : ''}`}>TypeScript</p>
                        </div>
                    </div>
                </div>

                {/* --- NEW: "Services Used" Section --- */}
                <div>
                    <h3 className="text-3xl font-bold italic mb-3 transition-all duration-700 ease-in-out">Servecies Used</h3>
                    {/* A container for the technology icons */}
                    <div className="flex justify-center items-center gap-6 transition-all duration-700 ease-in-out">
                        <div
                            onMouseEnter={() => handleLogoHover('EJS', '/Sounds/pop.mp3', 1.8)}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-700 ease-in-out"
                        >
                            <img src={emailJS} className={`${logoIcon} ${hover === 'EJS' ? iconHover : ''}`} alt="Email JS Logo" />
                            <p className={`${logoName} ${hover === 'EJS' ? logoHover : ''}`}>Email JS</p>
                        </div>
                        <div
                            onMouseEnter={() => handleLogoHover('FB', '/Sounds/pop.mp3', 2)}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-700 ease-in-out"
                        >
                            <img src={firebase} className={`${logoIcon} ${hover === 'FB' ? iconHover : ''}`} alt="Firebase Logo" />
                            <p className={`${logoName} ${hover === 'FB' ? logoHover : ''}`}>Firebase</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Text Block */}
                <div className="flex items-center gap-x-2 text-xl font-semibold italic transition-all duration-700 ease-in-out">
                    <span>Created with</span>
                    <Heart onClick={() => {
                        stopAllSounds();
                        playSound(bgMusic, { isEnabled: volume, time: 4 });
                        setShowHeart(true);
                    }}
                        className="inline-block text-red-500 fill-red-500 transition-all duration-700 ease-in-out" size={20} />
                    <span>By yours truly</span>
                </div>
            </div>

            <HeartPopUp
                isVisible={showHeart}
                onClose={() => {
                    setShowHeart(false)
                    playSound('/Sounds/pop1.mp3', { isEnabled: volume });
                }}
                volume={volume}
                setBroken={broken}
                />
                
        </section>
    );
};

// This line makes the component available to be imported in other files
export default Credits;
