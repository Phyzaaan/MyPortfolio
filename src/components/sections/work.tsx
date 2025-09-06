import React, { useState, useRef, useEffect } from "react";

import ProjectCard from "../ui/projectCards";
import SkillBar from "../ui/skillBar";
import { playSound } from "../../utils/sound";

interface Props {
    isVisible: boolean;
    volume: boolean;
}

import askMeAnything from '/img/askMeAnything.webp';
import surprise from '/img/surprise.webp';
import MyCharacterGuide from '/img/MyCharGuide.webp';


// Mock data for the project cards
const projects = [
    {
        imageUrl: surprise, // Placeholder image
        webPath: 'https://nhrvqo.mimo.run/index.html',
        title: 'My Best Project',
        description: 'This is my best project yet. I Worked day and night tirelessly to make this project.',
        name: 'Surprise'
    },
    {
        imageUrl: askMeAnything, // Placeholder image
        webPath: 'https://askmeanything-port.up.railway.app/',
        title: 'Another Great Project',
        description: 'This project took more than twenty-five years to make. It was a true labor of love.',
        name: 'Ask Me Anything'
    },
    {
        imageUrl: MyCharacterGuide, // Placeholder image
        webPath: 'https://my-character-guide.vercel.app/',
        title: 'A Fun Project',
        description: 'Built for fun, this is the most useless website that I have ever made.',
        name: 'My Character Guide'
    }
];


const Work: React.FC<Props> = ({ isVisible, volume }) => {
    const [topCard, setTopCard] = useState('p3');

    function handleSetTop(topCard: string) {
        playSound('/Sounds/Hover.mp3', { isEnabled: volume })
        setTopCard(topCard);
    }

    {/* Scroll logic */ }
    const { scrollContainerRef, handleScroll } = useScrollTitle();
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    function useScrollTitle() {
        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const handleScroll = () => {
            const container = scrollContainerRef.current;
            if (container) {
                const pageHeight = container.clientHeight; // Height of one page
                setCurrentPageIndex(Math.round(container.scrollTop / pageHeight));
            }
        };
        return { scrollContainerRef, handleScroll };
    }

    useEffect(() => {
        playSound('/Sounds/trans.mp3', { isEnabled: volume, speed: 1.5, time: 0.5 });
    }, [currentPageIndex]);


    return (
        <section
            className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] overflow-hidden flex flex-col transition-all duration-700 ease-in-out
            ${isVisible ? 'top-[60px]' : 'top-[600px]'}`}
        >

            {/* --- WINDOW CONTENT --- */}
            <div ref={scrollContainerRef}
                onScroll={handleScroll}
                className="p-4 flex-grow flex flex-col gap-y-3 overflow-y-auto snap-y snap-mandatory h-full"
            >
                <div className="h-full w-full flex-shrink-0 snap-start p-5">
                    <h2 className="text-3xl font-bold text-[var(--text-color)] text-center transition-all duration-700 ease-in-out">
                        Here are some of my websites
                    </h2>

                    {/* --- Project Card Stacking Container --- */}
                    <div className="flex justify-center items-center pb-5 border-b-2 h-full transition-all duration-700 ease-in-out">
                        <ProjectCard
                            setTop={handleSetTop}
                            id='p1'
                            {...projects[0]}
                            className={`-mr-24 ${topCard === 'p1' ? 'rotate-[0deg] scale-110 z-3 ' : 'rotate-[-8deg] scale-100 z-1'}`}
                        />
                        <ProjectCard
                            setTop={handleSetTop}
                            id='p2'
                            {...projects[1]}
                            className={`${topCard === 'p2' ? 'scale-110 z-3 ' : 'scale-100 z-2'}`}
                        />
                        <ProjectCard
                            setTop={handleSetTop}
                            id='p3'
                            {...projects[2]}

                            className={`-ml-24 ${topCard === 'p3' ? 'rotate-[0deg] scale-110 z-3 ' : 'rotate-[8deg] scale-100 z-1'}`}
                        />
                    </div>
                </div>

                <div className="h-full w-full flex-shrink-0  snap-start p-5 mt-10">
                    <h2 className="text-3xl font-bold text-[var(--text-color)] text-center transition-all duration-700 ease-in-out">
                        My Skills
                    </h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-3 mt-5 overflow-hidden">
                        <SkillBar skill="Full Stack" percentage={60} />
                        <SkillBar skill="Frontend" percentage={73} />
                        <SkillBar skill="Backend" percentage={56} />
                    </div>
                </div>
            </div>
        </section >
    );
};

// This line makes the component available to be imported in other files
export default Work;
