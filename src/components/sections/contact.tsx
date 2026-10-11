import React, { useState } from "react";
import { playSound } from "../../utils/sound";
import btnPressSound from "/Sounds/btn-press.mp3";
import Alert from "../ui/Alert";
import { MdEmail } from "react-icons/md";

interface Props {
  isVisible: boolean;
  volume: boolean;
}

const EMAIL = "phyzaaan@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Hello from your portfolio")}`;

const Contact: React.FC<Props> = ({ isVisible, volume }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleOpenMail = () => {
    playSound(btnPressSound, { isEnabled: volume });
    // The <a href="mailto:..."> handles opening the default email app.
  };

  // Fallback for devices that have no default mail app configured
  const handleCopy = async () => {
    playSound(btnPressSound, { isEnabled: volume });
    try {
      await navigator.clipboard.writeText(EMAIL);
      setAlertMsg("Email address copied!");
    } catch {
      setAlertMsg(`Couldn't copy. My email is ${EMAIL}`);
    }
    setShowAlert(true);
  };

  return (
    <section
      className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] flex flex-col 
            ${isVisible ? "top-[60px]" : "top-[1300px]"} transition-all duration-250`}
    >
      {/* --- WINDOW CONTENT (fills the whole section) --- */}
      <div className="h-full w-full p-5 flex-grow flex flex-col items-center gap-y-6 text-center overflow-y-auto">
        <div className="flex flex-col items-center">
          <MdEmail className="h-24 w-24" />
          <h2 className="text-4xl sm:text-6xl font-bold text-[var(--text-color)]">
            Send me mail
          </h2>
        </div>

        <p className="text-sm text-[var(--text-color)]/70">
          Click the button to write me an email in your default mail app.
        </p>

        {/* --- Email address display --- */}
        <div className="w-full max-w-94  bg-[var(--input-color)] p-4 rounded-lg border-2 border-[var(--border-color)] text-[var(--text-color)] font-bold break-all select-all">
          {EMAIL}
        </div>

        {/* --- Open mail app button --- */}
        <a
          href={MAILTO}
          onClick={handleOpenMail}
          className="w-full max-w-94 block bg-[var(--btn-color)] text-[var(--text-color)] font-bold py-4 rounded-lg border-2 border-[var(--border-color)]
                       shadow-[0_5px_0px_var(--shadow)] hover:bg-white/20
                       active:translate-y-1 active:shadow-[0_2px_0px_#4338ca]
                       focus:outline-none focus:ring-2 focus:ring-[#00eaff]
                       transition-transform duration-100"
        >
          Open email app
        </a>

        {/* --- Copy fallback --- */}
        <button
          type="button"
          onClick={handleCopy}
          className="text-sm font-bold text-[var(--text-color)]/70 underline underline-offset-4 hover:text-[var(--text-color)]
                       focus:outline-none focus:ring-2 focus:ring-[#00eaff] rounded"
        >
          No mail app? Copy my address
        </button>
      </div>

      <Alert
        isVisible={showAlert}
        message={alertMsg}
        onClose={() => setShowAlert(false)}
        volume={volume}
      />
    </section>
  );
};

export default Contact;
