import React from 'react';

const Popup = ({ isOpen, onClose, eventDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black bg-opacity-50">
      <div className="bg-tertiary rounded-lg p-6 max-w-md mx-auto shadow-lg">
        <h2 className="text-2xl font-bold text-primary">{eventDetails.title}</h2>
        <p className="text-gray-300 text-justify">{eventDetails.description}</p>
        <button onClick={onClose} className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition">
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
