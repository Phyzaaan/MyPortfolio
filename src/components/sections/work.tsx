import React, { useState } from "react";

import ProjectCard from "../ui/projectCards";
import { playSound } from "../../utils/sound";
import hoverSound from '/Sounds/hover.mp3'

interface Props {
    isVisible: boolean;
    volume: boolean;
}

import musicPlayer from '/img/MusicPlayer.png';
import elementalSynthLab from '/img/ElementalSynthLab.png';
import FuriMusic from '/img/FuriMusic.png';


// Mock data for the project cards
const projects = [
    {
        imageUrl: musicPlayer, // Placeholder image
        webPath: 'https://phyzaaan.github.io/Music-Player/',
        title: 'Music Player',
        description: 'A sleek music player with personal favroite playlist of songs.',
        name: 'Music Player'
    },
    {
        imageUrl: elementalSynthLab, // Placeholder image
        webPath: 'https://phyzaaan.github.io/Elemental-Synthesis-Lab---Genshin-Impact-mini-game/',
        title: 'Elemental Synth Lab',
        description: 'An experimental synthesizer Genshin Impact mini-game.',
        name: 'Elemental Synth Lab'
    },
    {
        imageUrl: FuriMusic, // Placeholder image
        webPath: 'https://furi-music.vercel.app/',
        title: 'Furi Music',
        description: 'This webapp is for MOBILES! Its still under construction.',
        name: 'Furi Music'
    }
];


const Work: React.FC<Props> = ({ isVisible, volume }) => {
    const [topCard, setTopCard] = useState('p2');

    function handleSetTop(topCardid: string) {
        if (topCardid !== topCard) {
        playSound(hoverSound, { isEnabled: volume, volume: 1 })
        setTopCard(topCardid);
        }
    }


    return (
        <section
            className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] overflow-hidden flex flex-col 
            ${isVisible ? 'top-[60px]' : 'top-[1300px]'} transition-all duration-250`}
        >

            {/* --- WINDOW CONTENT --- */}
            <div
                className="p-4 flex-grow flex flex-col gap-y-3 h-full"
            >
                <div className="h-full w-full flex-shrink-0 snap-start p-5">
                    <h2 className="text-3xl relative z-3 font-bold mix-blend-difference text-center ">
                        Here are some of my websites
                    </h2>

                    {/* --- Project Card Stacking Container --- */}
                    <div className="flex justify-center items-center pb-5 border-b-2 h-full ">
                        <ProjectCard
                            setTop={handleSetTop}
                            id='p1'
                            {...projects[0]}
                            className={`-mr-24 ${topCard === 'p1' ? 'rotate-[0deg] scale-110 z-3 ' : 'rotate-[-8deg] scale-100 z-1'} transition-all duration-150`}
                        />
                        <ProjectCard
                            setTop={handleSetTop}
                            id='p2'
                            {...projects[1]}
                            className={`${topCard === 'p2' ? 'scale-110 z-3 ' : 'scale-100 z-2'} transition-all duration-150`}
                        />
                        <ProjectCard
                            setTop={handleSetTop}
                            id='p3'
                            {...projects[2]}

                            className={`-ml-24 ${topCard === 'p3' ? 'rotate-[0deg] scale-110 z-3 ' : 'rotate-[8deg] scale-100 z-1'} transition-all duration-150`}
                        />
                    </div>
                </div>
            </div>
        </section >
    );
};

// This line makes the component available to be imported in other files
export default Work;
