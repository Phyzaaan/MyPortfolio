import React, { useState, Suspense } from "react";
import { Heart } from 'lucide-react';

import vite from '/svgs/vite.svg';
import react from '/svgs/react.svg';
import typescript from '/svgs/typescript.svg';
import tailwindcss from '/svgs/tailwindcss.svg';
import emailJS from '/svgs/emailJS.webp';
import firebase from '/svgs/firebase.webp';

import HeartPopUp  from './MyHeart';
import { playSound } from "../../utils/sound";
import popOutSound from '/Sounds/pop-out.mp3';
import paidSound from '/Sounds/paid.mp3';
import hoverSound from '/Sounds/hover.mp3';

interface Props {
    isVisible: boolean;
    volume: boolean;
    bgMusic: string;
    broken: () => void;
    fallback: React.ReactNode;
}





const Credits: React.FC<Props> = ({ isVisible, volume, bgMusic, broken, fallback }) => {
    const [showHeart, setShowHeart] = useState(false);


    const logoIcon = `h-10 w-10 translate-y-1 group-hover:scale-120 group-hover:translate-y-0`;
    const logoName = `text-sm text-[var(--text-color)]/70 opacity-0 scale-80 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-1 `;
    const iconHover = `scale-120 translate-y-1`;
    const logoHover = `opacity-100 scale-100 translate-y-2`;

    return (
        <section
            className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] overflow-hidden flex flex-col  overflow-y-scroll
            ${isVisible ? 'top-[60px]' : 'top-[1300px]'} transition-all duration-250`}
        >

            {/* --- WINDOW CONTENT --- */}
            <div className="flex-grow flex flex-col justify-between items-center p-6 text-center text-[var(--text-color)] ">

                {/* Top Text Block */}
                <div>
                    <h3 className="text-3xl font-bold italic ">Inspired by</h3>
                    <a href="https://www.sharyap.com/" target="_blank" className="text-lg text-[var(--text-color)]/70 ">Shar's Desktop</a>
                </div>

                {/* --- NEW: "Built With" Section --- */}
                <div>
                    <h3 className="text-3xl font-bold italic mb-3 ">Built With</h3>
                    {/* A container for the technology icons */}
                    <div className="flex justify-center items-center text-center gap-6 transition-all duration-200">
                        <div
                            onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center"
                        >
                            <img src={react} className={`${logoIcon} group-hover:${iconHover}`} alt="React Logo" />
                            <p className={`${logoName} group-hover:${logoHover}`}>REACT</p>
                        </div>
                        <div
                            onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <img src={vite} className={`${logoIcon} group-hover:${iconHover}`} alt="Vite Logo" />
                            <p className={`${logoName} group-hover:${logoHover}`}>Vite</p>
                        </div>
                        <div
                            onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <img src={tailwindcss} className={`${logoIcon} group-hover:${iconHover}`} alt="Tailwind css Logo" />
                            <p className={`${logoName} group-hover:${logoHover}`}>Tailwindcss</p>
                        </div>

                        <div
                            onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <img src={typescript} className={`${logoIcon} group-hover:${iconHover}`} alt="TypeScript Logo" />
                            <p className={`${logoName} group-hover:${logoHover}`}>TypeScript</p>
                        </div>
                    </div>
                </div>

                {/* --- NEW: "Services Used" Section --- */}
                <div>
                    <h3 className="text-3xl font-bold italic mb-3 ">Servecies Used</h3>
                    {/* A container for the technology icons */}
                    <div className="flex justify-center items-center gap-6">
                        <div
                            onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <img src={emailJS} className={`${logoIcon} group-hover:${iconHover}`} alt="Email JS Logo" />
                            <p className={`${logoName} group-hover:${logoHover}`}>Email JS</p>
                        </div>
                        <div
                            onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <img src={firebase} className={`${logoIcon} group-hover:${iconHover}`} alt="Firebase Logo" />
                            <p className={`${logoName} group-hover:${logoHover}`}>Firebase</p>
                        </div>
                    </div>
                </div>

                {/* --- NEW: "My Socials" Section --- */}
                <div>
                    <h3 className="text-3xl font-bold italic mb-3 ">My Socials</h3>
                    {/* A container for the technology icons */}
                    <div className="flex justify-center items-center gap-6 transition-all duration-200">
                        <a href="https://github.com/Phyzaaan" target="_blank">
                        <div
                        onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <i className={`${logoIcon} fa-2x fa-brands fa-github group-hover:${iconHover}`}></i>
                            <p className={`${logoName} group-hover:${logoHover}`}>GitHub</p>
                        </div>
                        </a>
                        <a href="https://www.reddit.com/user/Phyzaaan/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button" target="_blank">
                        <div
                        onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <i className={`${logoIcon} fa-2x fa-brands fa-reddit group-hover:${iconHover}`}></i>
                            <p className={`${logoName} group-hover:${logoHover}`}>Reddit</p>
                        </div>
                        </a>
                        <a href="https://www.linkedin.com/in/phyzan/" target="_blank">
                        <div
                        onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <i className={`${logoIcon} fa-2x fa-brands fa-linkedin-in group-hover:${iconHover}`}></i>
                            <p className={`${logoName} group-hover:${logoHover}`}>LinkedIn</p>
                        </div>
                        </a>
                        <a href="https://discord.com/users/1274577698001387540" target="_blank">
                        <div
                        onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <i className={`${logoIcon} fa-2x fa-brands fa-discord group-hover:${iconHover}`}></i>
                            <p className={`${logoName} group-hover:${logoHover}`}>Discord</p>
                        </div>
                        </a>
                        <a href="https://www.instagram.com/phyzaaan/" target="_blank">
                        <div
                        onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
                            className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                        >
                            <i className={`${logoIcon} fa-2x fa-brands fa-instagram group-hover:${iconHover}`}></i>
                            <p className={`${logoName} group-hover:${logoHover}`}>instagram</p>
                        </div>
                        </a>
                    </div>
                </div>

                {/* Bottom Text Block */}
                <div className="flex items-center gap-x-2 text-xl font-semibold italic ">
                    <span>Created with</span>
                    <Heart onClick={() => {
                        setShowHeart(true);
                        playSound(paidSound, { isEnabled: volume });
                    }}
                        className="inline-block text-red-500 fill-red-500 " size={20} />
                    <span>By yours truly</span>
                </div>
            </div>

            <Suspense fallback={fallback}>
                <HeartPopUp
                    isVisible={showHeart}
                    onClose={() => {
                        setShowHeart(false)
                        playSound(popOutSound, { isEnabled: volume, volume: 0.3 });
                    }}
                    volume={volume}
                    bgMusic={bgMusic}
                    setBroken={broken}
                />
            </Suspense>

        </section>
    );
};

// This line makes the component available to be imported in other files
export default Credits;
