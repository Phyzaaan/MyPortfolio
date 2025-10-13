import React, { useState, useEffect } from "react";

import { FixedSizeList as List } from 'react-window';

import { playSound } from "../../utils/sound";
import btnPressSound from '/Sounds/btn-press.mp3'
import paidSound from '/Sounds/paid.mp3'

import Alert from '../ui/Alert'

import { db } from "../../firebase/config";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";


interface Props {
    isVisible: boolean;
    volume: boolean;
}


// Define the shape of a single Comments object
interface Comments {
    id: string;
    name: string;
    text: string;
    createdAt: Date;
    isPinned?: boolean;
}



const Comments: React.FC<Props> = ({ isVisible, volume, }) => {

    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    // State for the list of comments, pre-populated with one example
    const [comments, setcomments] = useState<Comments[]>([]);
    // State for the form inputs
    const [newComments, setNewComments] = useState('');
    const [newName, setNewName] = useState('');
    const [isSent, setIsSent] = useState(false);


    useEffect(() => {
        // Create a query to get comments and order them by newest first
        const commentsQuery = query(
            collection(db, "comments"),
            orderBy("isPinned", "desc"),
            orderBy("createdAt", "desc")
        );

        // onSnapshot is our magic listener!
        const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                text: doc.data().text,
                createdAt: doc.data().createdAt.toDate(),
                isPinned: doc.data().isPinned || false,
            }));
            setcomments(commentsData);
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    // --- Step 5: Writing a new message! ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSent(true);
        if (!newComments.trim()) return;
        playSound(btnPressSound, { isEnabled: volume })

        try {
            await addDoc(collection(db, "comments"), {
                name: newName.trim() || '?',
                text: newComments.trim(),
                createdAt: new Date(), // Add a timestamp!
                isPinned: false,
            });
            // Play sound on success!
            playSound(paidSound, { isEnabled: volume });
            setAlertMessage("Thanks for your Comments!");
            setShowAlert(true);
            // Clear the form
            setNewComments('');
            setNewName('');
        } catch (error) {
            setAlertMessage(`Gawrsh! Couldn't send your Comments! ${error}`);
            setShowAlert(true);
            setIsSent(false);
        }
    };


    const CommentsRow = ({ index, style }: { index: number, style: React.CSSProperties }) => {
        const Comments = comments[index];
        return (
            // The magic `style` prop tells the binoculars exactly where to place this Comments!
            <div className="transition-all duration-700 ease-in-out" style={style}>
                <div
                    key={Comments.id}
                    className="flex items-start gap-x-3 bg-[var(--secondary-color)] border-2 border-[var(--border-color)] rounded-lg p-3 mx-2 transition-all duration-700 ease-in-out"
                >
                    <span className="scale-200 flex-shrink-0 transition-all duration-700 ease-in-out" >🙂</span>
                    <div>
                        <p className="font-extrabold text-[var(--text-color-2)]">{Comments.name}<span className="overflow-hidden rounded-2xl h-fit w-fit mx-2 transition-all duration-700 ease-in-out">{Comments.isPinned ? '✅' : ''}</span></p>
                        <p className="transition-all duration-700 ease-in-out">{Comments.text}</p>
                    </div>
                </div>
            </div>
        );
    };


  


    return (
        <section
            className={`absolute inset-0 z-30 bg-[var(--primary-color)] w-full h-[89%] overflow-hidden flex flex-col transition-all duration-700 ease-in-out
            ${isVisible ? 'top-[60px]' : 'top-[600px]'}`}
        >

            {/* --- WINDOW CONTENT --- */}
            <div className="w-full h-full overflow-y-auto flex flex-col gap-4 bg-[var(--primary-color)] p-4 transition-all duration-700 ease-in-out">
                {/* --- Comments Submission Form --- */}
                <form onSubmit={handleSubmit}>
                    {/* Text area for the new Comments */}
                    <div className="transition-all duration-700 ease-in-out">
                        <label className="transition-all duration-700 ease-in-out" htmlFor="email"></label>
                        <textarea
                            id="email"
                            value={newComments}
                            onChange={(e) => setNewComments(e.target.value)}
                            placeholder="Write your Comments here..."
                            className="w-full h-20 bg-[var(--input-color)] border-2 border-[var(--border-color)] rounded-lg focus:border-3 focus:outline-none p-2 transition-all duration-700 ease-in-out"
                            required
                        />
                    </div>
                    {/* Name input and submit button */}
                    <div className="flex items-center justify-between mt-2 transition-all duration-700 ease-in-out">
                        <div className="flex flex-col text-left transition-all duration-700 ease-in-out">
                            <label htmlFor="name" className="text-sm font-bold text-[var(--text-color)]/70 transition-all duration-700 ease-in-out">Name (Optional)</label>
                            <input
                                id="name"
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Your name..."
                                className="w-40 bg-[var(--input-color)] p-1 rounded-lg border-2 border-[var(--border-color)] focus:outline-none focus:border-3 pl-2 transition-all duration-700 ease-in-out"
                            />
                        </div>
                        <button
                            onClick={() => playSound(btnPressSound, { isEnabled: volume })}
                            disabled={isSent}
                            type="submit"
                            className="px-4 py-1 mt-2 bg-[var(--btn-color)] text-[var(–text-color)] font-bold rounded-lg border-2 border-[var(--border-color)]
                        shadow-[0_4px_0px_#4338ca] hover:bg-[var(--btn-color)]/50
                        active:translate-y-1 active:shadow-[0_0px_0px_#4338ca]
                        transition-all duration-150 ease-in-out"
                        >
                            <span className="transition-all duration-700 ease-in-out">Submit</span>
                        </button>
                    </div>
                </form>

                {/* --- comments Display Area --- */}
                {/* This container has the themed border and will scroll if content overflows. */}
                <div className="flex-grow w-full h-full border-2 border-[var(--border-color)] rounded-lg p-2 transition-all duration-700 ease-in-out">
                    <List
                        height={330}
                        width={'100%'}  
                        itemCount={comments.length} // The total number of comments
                        itemSize={95}
                    >
                        {CommentsRow}
                    </List>

                </div>
            </div >
            <Alert
                isVisible={showAlert}
                message={alertMessage}
                onClose={() => setShowAlert(false)}
                volume={volume}
            />
        </section >
    );
};

// This line makes the component available to be imported in other files
export default Comments;
