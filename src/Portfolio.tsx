import React, { useState, useEffect, useRef, Suspense } from 'react';
import './App.css';

import { playSound } from './utils/sound';

import Welcome from './components/sections/welcome';
import Home from './components/sections/home';

const AboutMe = React.lazy(() => import('./components/sections/aboutMe'))
const Work = React.lazy(() => import('./components/sections/work'));
const Contact = React.lazy(() => import('./components/sections/contact'));
const Comments = React.lazy(() => import('./components/sections/comment'));
const Credits = React.lazy(() => import('./components/sections/credits'));

import Header from './components/ui/header';
const Bg = React.lazy(() => import('./components/ui/bg'));
const SubscriptionModal = React.lazy(() => import('./components/ui/subModal'));

const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <p className="text-white text-2xl font-bold">Loading...</p>
  </div>
);

type WindowId = 'About' | 'Work' | 'Contact' | 'Comments' | 'Credits';
const Portfolio: React.FC = () => {

  const [headerTitle, setHeaderTitle] = useState('Welcome');
  const [paid, setPaid] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [broken, setBroken] = useState(false);
  const [volume, setVolume] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);


  {/* Pop-up Windows logic handlers*/ }
  const [windows, setWindows] = useState({
    About: false, Work: false, Contact: false, Comments: false, Credits: false,
  });

  const openWindow = (id: WindowId) => {
    setWindows(prev => {
      return {...prev, [id]: true };
    });
    setShowCloseBtn(true);
    setHeaderTitle(id);
  };

  const closeWindow = () => {
    setWindows({
        About: false,
        Work: false,
        Contact: false,
        Comments: false,
        Credits: false,
    });
    setShowCloseBtn(false);
    setHeaderTitle('Home'); 
    playSound('/Sounds/pop1.mp3', { isEnabled: volume });
  };


  {/* Scroll logic */ }
  const { scrollContainerRef, handleScroll } = useScrollTitle();

  function useScrollTitle() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const pageTitles = ['Welcome', 'Home'];
    const handleScroll = () => {
      playSound('/Sounds/trans.mp3', { isEnabled: volume, speed: 1.5, time: 0.5 });
      const container = scrollContainerRef.current;
      if (container) {
        const pageHeight = container.clientHeight; // Height of one page
        const currentPageIndex = Math.round(container.scrollTop / pageHeight);

        // Get the new title, default to last title if out of bounds
        const newTitle = pageTitles[currentPageIndex] || pageTitles[pageTitles.length - 1];

        if (headerTitle !== newTitle) {
          setHeaderTitle(newTitle);
        }
      }
    };
    return { headerTitle, scrollContainerRef, handleScroll };
  }


  const [bgMusic, setBgMusic] = useState('');
  useEffect(() => {
    if (paid) {
      if (broken) {
        document.documentElement.classList.add('broken');
      } else {
        document.documentElement.classList.remove('broken');
      }
      document.documentElement.classList.add('paid-font');
      setVolume(true);
      if (darkMode) {
        document.documentElement.classList.add('dark-theme');
        setBgMusic('/Sounds/nostalgic-bg.mp3');
      } else {
        document.documentElement.classList.remove('dark-theme');
        setBgMusic('/Sounds/ambient-bg.mp3');
      }
    } else {
      setVolume(false);
      document.documentElement.classList.remove('paid-font');
    } 
  }, [paid, darkMode, broken]);

  // Hnandle subscription action
  const handleSubscribe = () => {
    playSound('/Sounds/paid.mp3', { isEnabled: volume })
    setPaid(true);
    setShowSubModal(false);
  };


  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        {/* Animated background behind everything */}
        <Bg
          paid={paid}
          darkMode={darkMode}
        />


        {/* Main content */}
        <main className={`relative w-[80%] min-w-[350px] max-w-5xl h-[65vh] min-h-[350px] max-h-[900px] overflow-hidden flex flex-col backdrop-blur-sm border-3 border-[var(--border-color)] mx-auto ${paid ? 'rounded-2xl shadow-[2px_3px_5px_0_var(--shadow)] transition-all duration-700 ease-in-out' : 'bg-white'} ${ broken ? 'bg-[var(--primary-color)]' : ''}`}>
          <Header
            title={headerTitle}
            paid={paid}
            darkMode={darkMode}
            volume={volume}
            setDarkMode={setDarkMode}
            setVolume={setVolume}
            setShowModal={setShowSubModal}
            closeWindow={closeWindow}
            closeBtn={showCloseBtn}
          />

          {/* Scroll container for the page sections */}
          <section
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className=" overflow-y-auto snap-y snap-mandatory h-full"
          >
            <Welcome paid={paid} />
            <Home
              paid={paid}
              volume={volume}
              showSubModal={setShowSubModal}
              openWindow={openWindow}
            />
          </section>

            {/* About Me */}
            <AboutMe
              isVisible={windows.About}
              volume={volume}
              openWindow={openWindow}
            />

            {/* Work */}
            <Work
              isVisible={windows.Work}
              volume={volume}

            />

            <Contact
              isVisible={windows.Contact}
              volume={volume}
            />

            <Comments
              isVisible={windows.Comments}
              volume={volume}
            />

            <Credits
              isVisible={windows.Credits}
              volume={volume}
              bgMusic={bgMusic}
              broken={() => setBroken(true)}
            />

        </main>
      </Suspense>

      {/* Subscription Modal */}
      <SubscriptionModal
        isVisible={showSubModal}
        onClose={() => setShowSubModal(false)}
        onSubscribe={handleSubscribe}
      />
    </>
  );
};

export default Portfolio;