import React, { useState, useRef } from "react";
import { playSound } from "../../utils/sound";

import emailjs from '@emailjs/browser';
import Alert from '../ui/Alert'

interface Props {
    isVisible: boolean;
    volume: boolean;
}





const Contact: React.FC<Props> = ({ isVisible, volume }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("hi");

    const formRef = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);

    {/* Handle form submission */ }
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: ''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSending(true);
        playSound('/Sounds/btn-press.mp3', { isEnabled: volume })

        emailjs.sendForm(
            'service_4g77778',  // Service ID
            'template_8izhf0d', // Template ID
            formRef.current,
            '-AnaJnpfbDeUYlG_v'   // Public Key
        ).then(() => {
            playSound('/Sounds/paid.mp3', { isEnabled: volume });
            setAlertMsg("Email sent successfully!");
            setShowAlert(true);
            formRef.current?.reset(); // Reset the form fields
            setFormData({ email: '', subject: '', message: '' }); // Reset state
        })
            .catch((error) => {
                setAlertMsg(`Failed... ${error.text}`);
                setShowAlert(true);
                setIsSending(false);
            });
    };


  


    return (
        <section
            className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] overflow-hidden flex flex-col transition-all duration-700 ease-in-out
            ${isVisible ? 'top-[60px]' : 'top-[600px]'}`}
        >

            {/* --- WINDOW CONTENT --- */}
            <div className="p-4 flex-grow flex flex-col gap-y-3 overflow-y-auto transition-all duration-700 ease-in-out">
                {/* Inner form container */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col sm:flex-row gap-6 border-2 border-[var(--border-color)] rounded-lg p-6 transition-all duration-700 ease-in-out"
                >
                    {/* Left Column */}
                    <div className="flex flex-col gap-y-4 w-full sm:w-1/3 transition-all duration-700 ease-in-out">
                        <h2 className="text-2xl font-bold text-[var(--text-color)] text-center transition-all duration-700 ease-in-out">Send me mail</h2>
                        {/* --- Email Input --- */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-[var(--text-color)]/70 mb-1 transition-all duration-700 ease-in-out" id="email-label">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-[var(--input-color)] p-2 rounded-lg border-2 border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[#00eaff] transition-all duration-700 ease-in-out"
                            />
                        </div>

                        {/* --- Subject Input --- */}
                        <div className="transition-all duration-700 ease-in-out">
                            <label htmlFor="subject" className="block text-sm font-bold text-[var(--text-color)]/70 mb-1 transition-all duration-700 ease-in-out">Subject</label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-lg bg-[var(--input-color)] border-2 border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[#00eaff] transition-all duration-700 ease-in-out"
                            />
                        </div>

                        {/* --- Submit Button --- */}
                        <button
                            disabled={isSending}
                            type="submit"
                            className="w-full bg-[var(--btn-color)] text-[var(--text-color)] font-bold py-3 rounded-lg border-2 border-[var(--border-color)]
                           shadow-[0_5px_0px_var(--shadow)] hover:bg-white/20
                           active:translate-y-1 active:shadow-[0_2px_0px_#4338ca]
                           transition-all duration-150 ease-in-out"
                        >
                            <span className="transition-all duration-700 ease-in-out">Send</span>
                        </button>
                    </div>

                    {/* Right Column */}
                    <div className="w-full sm:w-2/3 h-[250px] sm:h-full transition-all duration-700 ease-in-out">
                        {/* --- Message Textarea (Formerly a Reusable Component) --- */}
                        <div className="w-full h-full flex flex-col">
                            <label htmlFor="message" className="block text-sm font-bold text-[var(--text-color)]/70 mb-1 transition-all duration-700 ease-in-out">Enter your Email here</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full h-full p-2 bg-[var(--input-color)] rounded-lg border-2 border-[var(--border-color)] resize-none focus:outline-none focus:ring-2 focus:ring-[#00eaff] transition-all duration-700 ease-in-out"
                            />
                        </div>
                    </div>
                </form>
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

// This line makes the component available to be imported in other files
export default Contact;
