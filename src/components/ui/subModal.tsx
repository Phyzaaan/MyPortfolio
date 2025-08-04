import React from "react";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const SubscriptionModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSubscribe,
}) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center relative max-w-sm w-full transform scale-100 opacity-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-inter">
          Just For $5!
        </h2>
        <p className="text-lg text-gray-700 mb-8 font-inter">
          Please subscribe to get access to the premium features.
        </p>
        <button
          onClick={onSubscribe}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Subscribe Now!
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-semibold mt-5"
          aria-label="Close"
        >
          No, Thanks
        </button>
      </div>
    </div>
  );
};

// This line makes the component available to be imported in other files
export default SubscriptionModal;
