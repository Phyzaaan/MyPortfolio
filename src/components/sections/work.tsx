import React, { useState } from "react";

import ProjectCard from "../ui/projectCards";

interface Props {
  isVisible: boolean;
  volume: boolean;
}

const projects = [
  {
    imageUrl: "/img/Surprise.png",
    webPath: "https://phyzaaan.github.io/Surprise/",
    title: "Surprise",
    description:
      "A totally fun and amazing website which will definitely NOT rick roll you...",
    name: "Surprise",
  },
  {
    imageUrl: "/img/FoodieChecker.png",
    webPath: "https://phyzaaan.github.io/Foodie-Checker/",
    title: "Foodie Checker",
    description:
      "Prepare for the judgement of the Oratrice Machnique D'Analyse Cardinale!",
    name: "Foodie Checker",
  },
  {
    imageUrl: "/img/FuriMusic.png",
    webPath: "https://furi-music.vercel.app/",
    title: "Furi Music",
    description: "Suggest me your favorite songs and DON'T touch furina.exe",
    name: "Furi Music",
  },
  {
    imageUrl: "/img/ElementalSynthLab.png",
    webPath:
      "https://phyzaaan.github.io/Elemental-Synthesis-Lab---Genshin-Impact-mini-game/",
    title: "Elemental Synth Lab",
    description: "Always use gloves and NEVER touch anything bare hands...",
    name: "Elemental Synth Lab",
  },
  {
    imageUrl: "/img/MusicPlayer.png",
    webPath: "https://phyzaaan.github.io/Music-Player/",
    title: "Music Player",
    description:
      "A local Music Player aka Music Plyer 1.0 or Old Music Player.",
    name: "Music Player",
  },
];

const Work: React.FC<Props> = ({ isVisible }) => {
  const [top, setTop] = useState(2);
  const [scrolling, setScrolling] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleDragStart = (e: React.TouchEvent) => {
    setScrolling(true);
    setStartX(e.touches[0].clientX);
  };

  const handleDrag = (e: React.TouchEvent) => {
    if (!scrolling) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (diff >= 80) {
      if (top < projects.length - 1) {
        setTop((prev) => prev + 1);
      }
      setScrolling(false);
    } else if (diff <= -80) {
      if (top > 0) {
        setTop((prev) => prev - 1);
      }
      setScrolling(false);
    }
  };

  const handleDragEnd = () => {
    setScrolling(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 5) return;

    setTop((prev) => {
      if (e.deltaY > 0) return Math.min(prev + 1, projects.length - 1);

      return Math.max(prev - 1, 0);
    });
  };

  return (
    <section
      className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] flex flex-col 
            ${isVisible ? "top-[60px]" : "top-[1300px]"} transition-all duration-250`}
    >
      {/* --- WINDOW CONTENT --- */}
      <div className="flex-grow flex flex-col gap-2">
        <div className="h-full w-full flex-shrink-0 snap-start p-5">
          <h2 className="text-3xl relative z-3 font-bold mix-blend-difference text-center ">
            Here are some of my websites
          </h2>

          {/* --- Project Card Stacking Container --- */}
          <div
            onTouchStart={handleDragStart}
            onTouchMove={handleDrag}
            onTouchEnd={handleDragEnd}
            onWheel={handleWheel}
            className="relative h-full w-full flex items-center justify-center  z-10 flex-col"
          >
            {projects.map((project, idx) => {
              const offset = idx - top;
              const abs = Math.abs(offset);

              const x = offset * 180;
              const y = offset === 0 ? -28 : abs * 14;
              const rotate = offset * 5;
              const rotateY = offset * -10;
              const scale = abs === 0 ? 1.08 : Math.max(1 - abs * 0.12, 0.72);
              const brightness = Math.max(1 - abs * 0.15, 0.55);
              const opacity = Math.max(1 - abs * 0.2, 0);

              return (
                <ProjectCard
                  key={idx}
                  id={idx}
                  setTop={setTop}
                  {...project}
                  className="absolute transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{
                    transform: `
                        translateX(${x}px)
                        translateY(${y}px)
                        perspective(1000px)
                        rotateY(${rotateY}deg)
                        rotate(${rotate}deg)
                        scale(${scale})
                    `,
                    boxShadow:
                      abs === 0
                        ? "0 0 30px rgba(120,220,255,.45)"
                        : "0 6px 18px rgba(0,0,0,.35)",
                    filter: `brightness(${brightness})`,
                    opacity,
                    zIndex: 100 - abs,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
