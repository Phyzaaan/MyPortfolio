import React from "react";
import { playSound } from "../../utils/sound";
import { CopyrightIcon, MailCheck, Info, File, MessageCircle } from "lucide-react";


interface Props {
    paid: boolean;
    showSubModal: (value: boolean) => void;
    volume: boolean;
    openWindow: (id: 'About' | 'Work' | 'Contact' | 'Comments' | 'Credits') => void;
}

const Home: React.FC<Props> = ({ paid, showSubModal, volume, openWindow }) => {
    const baseButtonStyles = `
        rounded-lg font-semibold tracking-wider 
        flex gap-2 pl-2
        focus:outline-none focus:ring-1

        // Responsive styles for better fit
        py-2  // Default (mobile)
        sm:py-3 sm:text-xl // Small screens and up (desktop)
      `;

    // These styles for color and effects can remain the same
    const paidButtonStyles =
        ' hover:bg-[var(--secondary-color)]/50 rounded-md border border-[var(--border-color)] shadow-[1px_3px_0_1px_var(--text-color)] active:translate-y-1 active:shadow-none transition-all duration-150 ease-in-out'
        ;
    const unpaidButtonStyles = `
        border border-gray-400 bg-gray-200 rounded-md
      `;


      const handleButtonClick = (windowId: 'About' | 'Work' | 'Contact' | 'Comments' | 'Credits') => {
        if (!paid) {
            // Decision #1: Not paid? Show the subscription modal.
            showSubModal(true);
        } else {
            // Decision #2: They paid? Go ahead and open the window!
            playSound('/Sounds/btn-press.mp3', { isEnabled: volume });
            openWindow(windowId);
        }
    };
    

    return (
        <div className="h-full w-full flex-shrink-0 snap-start flex flex-col p-5 transition-all duration-700 ease-in-out">

            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 sm:gap-6 w-full max-w-4xl">
                <button
                    onClick={() => handleButtonClick('About')}
                    className={`${baseButtonStyles} ${paid ? paidButtonStyles : unpaidButtonStyles}`}
                >
                    <Info className="scale-130 transition-all duration-700 ease-in-out"/>
                    About Me
                </button>

                <button
                    onClick={() => handleButtonClick('Work')}
                    className={`${baseButtonStyles} ${paid ? paidButtonStyles : unpaidButtonStyles}`}
                >
                    <File className="scale-130 transition-all duration-700 ease-in-out"/>
                    Work
                </button>

                <button
                    onClick={() => handleButtonClick('Contact')}
                    className={`${baseButtonStyles} ${paid ? paidButtonStyles : unpaidButtonStyles}`}
                >
                    <MailCheck className="scale-130 transition-all duration-700 ease-in-out"/>
                    Contact
                </button>
                <button
                    onClick={() => handleButtonClick('Comments')}
                    className={`${baseButtonStyles} ${paid ? paidButtonStyles : unpaidButtonStyles}`}
                >
                    <MessageCircle className="scale-130 transition-all duration-700 ease-in-out"/>
                    Comments
                </button>
                <button
                    onClick={() => handleButtonClick('Credits')}
                    className={`${baseButtonStyles} ${paid ? paidButtonStyles : unpaidButtonStyles}`}
                >
                    <CopyrightIcon className="scale-130 transition-all duration-700 ease-in-out"/>
                    Credits
                </button>
            </div>
        </div>
    );
};

// This line makes the component available to be imported in other files
export default Home;
