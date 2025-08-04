import React from "react";


import QnABlock from "../ui/QnABlocks";
{/* About Me Window */ }

interface Props {
  isVisible: boolean;
  volume: boolean;
  openWindow: (id: 'Comments') => void;
}



const AboutMe: React.FC<Props> = ({ isVisible, volume, openWindow}) => {
  return (
    <section
      className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] overflow-hidden flex flex-col transition-all duration-700 ease-in-out
       ${isVisible ? 'top-[60px]' : 'top-[600px]'}`}
    >

      {/* --- WINDOW CONTENT --- */}
      <div className="p-4 flex-grow flex flex-col gap-y-3 overflow-y-auto transition-all duration-700 ease-in-out">
        <div className="text-center pb-3 border-b-2 border-[var(--border-color)] transition-all duration-700 ease-in-out">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent
           bg-gradient-to-r from-indigo-600 to-pink-500 drop-shadow">FAIZAN SHAH</h2>
          <p className="italic text-[var(--text-color-2)] transition-all duration-700 ease-in-out">A Ordinary Guy With Extraordinary Goals</p>
        </div>

        <QnABlock title="What do I do?" content="I design and create websites." volume={volume} />

        <QnABlock title="Why do I create Websites?" content=" Just for Fun. I don't plan to make it my profession." volume={volume} />

        <QnABlock title="Why Web Development?" content="Because it's fun and I can create what ever I can imagine." volume={volume} />

        <QnABlock title="Am I down for collaboration?" content="Yes, But it should be fun. You can send me email." volume={volume} />

        <QnABlock title="Am I scred of AI?" content="No, I don't care About AI taking over my Work." volume={volume} />

        <QnABlock title="Do I use AI?" content="A lot. AI can't do everything. I use AI to help me." volume={volume} />

        <p className="text-[var(--text-color)]/70 transition-all duration-700 ease-in-out">If you have any further questions, feel free to ask me in <button onClick={() => openWindow('Comments')} className="underline text-[var(--text-color-2)] pointer-click transition-all duration-700 ease-in-out">comments</button></p>
      </div>
    </section>
  );
};

// This line makes the component available to be imported in other files
export default AboutMe;
