import React, { useState, Suspense } from "react";
import { Heart } from "lucide-react";

import HeartPopUp from "./MyHeart";
import { playSound } from "../../utils/sound";
import popOutSound from "/Sounds/pop-out.mp3";
import paidSound from "/Sounds/paid.mp3";
import hoverSound from "/Sounds/hover.mp3";

interface Props {
  isVisible: boolean;
  volume: boolean;
  bgMusic: string;
  broken: () => void;
  fallback: React.ReactNode;
}

const Credits: React.FC<Props> = ({
  isVisible,
  volume,
  bgMusic,
  broken,
  fallback,
}) => {
  const [showHeart, setShowHeart] = useState(false);

  const socials = [
    {
      name: "Github",
      link: "https://github.com/Phyzaaan",
      icon: "fa-github",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/phyzaaan/",
      icon: "fa-linkedin-in",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/phyzaaan/",
      icon: "fa-instagram",
    },
  ];

  const services = [
    {
        name: "Email JS",
        logo: "/svgs/emailJS.webp"
    },
    {
        name: "Firebase",
        logo: "/svgs/firebase.webp"
    },
  ]
  const techstack = [
    {
        name: "Vite",
        logo: "/svgs/vite.svg"
    },
    {
        name: "React",
        logo: "/svgs/react.svg"
    },
    {
        name: "Tailwindcss",
        logo: "/svgs/tailwindcss.svg"
    },
    {
        name: "Typescript",
        logo: "/svgs/typescript.svg"
    },
  ]



  const logoIcon = `h-10 w-10 translate-y-1 group-hover:scale-120 group-hover:translate-y-0`;
  const logoName = `text-sm text-[var(--text-color)]/70 opacity-0 scale-80 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-1 `;
  const iconHover = `scale-120 translate-y-1`;
  const logoHover = `opacity-100 scale-100 translate-y-2`;

  return (
    <section
      className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] overflow-hidden flex flex-col  overflow-y-scroll
            ${isVisible ? "top-[60px]" : "top-[1300px]"} transition-all duration-250`}
    >
      {/* --- WINDOW CONTENT --- */}
      <div className="flex-grow flex flex-col justify-between items-center p-6 text-center text-[var(--text-color)] ">
        {/* --- Built With Section --- */}
        <div>
          <h3 className="text-3xl font-bold italic mb-3 ">Built With</h3>
          <div className="flex justify-center items-center text-center gap-6 transition-all duration-200">
            {techstack.map(tech => (<div
              onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
              className="group w-15 flex flex-col justify-center items-center"
            >
              <img
                src={tech.logo}
                className={`${logoIcon} group-hover:${iconHover}`}
                alt={`${tech.name} Logo`}
              />
              <p className={`${logoName} group-hover:${logoHover}`}>{tech.name}</p>
            </div>))}
          </div>
        </div>

        {/* ---  Services Used Section --- */}
        <div>
          <h3 className="text-3xl font-bold italic mb-3 ">Servecies Used</h3>
          <div className="flex justify-center items-center gap-6">
            <div className="flex justify-center items-center text-center gap-6 transition-all duration-200">
            {services.map(service => (<div
              onMouseEnter={() => playSound(hoverSound, { isEnabled: volume })}
              className="group w-15 flex flex-col justify-center items-center"
            >
              <img
                src={service.logo}
                className={`${logoIcon} group-hover:${iconHover}`}
                alt={`${service.name} Logo`}
              />
              <p className={`${logoName} group-hover:${logoHover}`}>{service.name}</p>
            </div>))}
          </div>
          </div>
        </div>

        {/* --- My Socials Section --- */}
        <div>
          <h3 className="text-3xl font-bold italic mb-3 ">My Socials</h3>
          <div className="flex justify-center items-center gap-4 flex-wrap transition-all duration-200">
            {socials.map((social) => (
              <a href={social.link} target="_blank">
                <div
                  onMouseEnter={() =>
                    playSound(hoverSound, { isEnabled: volume })
                  }
                  className="group w-15 flex flex-col justify-center items-center transition-all duration-200"
                >
                  <i
                    className={`${logoIcon} fa-2x fa-brands ${social.icon} group-hover:${iconHover}`}
                  ></i>
                  <p className={`${logoName} group-hover:${logoHover}`}>
                    {social.name}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Text Block */}
        <div className="flex items-center gap-x-2 text-xl font-semibold italic ">
          <span>Created with</span>
          <Heart
            onClick={() => {
              setShowHeart(true);
              playSound(paidSound, { isEnabled: volume });
            }}
            className="inline-block text-red-500 fill-red-500 "
            size={20}
          />
          <span>By yours truly</span>
        </div>
      </div>

      <Suspense fallback={fallback}>
        <HeartPopUp
          isVisible={showHeart}
          onClose={() => {
            setShowHeart(false);
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

export default Credits;
