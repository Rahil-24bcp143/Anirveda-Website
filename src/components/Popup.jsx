import React from "react";

const Popup = ({ togglePopup }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-4/5 max-w-md rounded-lg bg-gray-800 p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-primary">Popup Title</h2>
        <p className="mb-4 text-base text-secondary">
          This is the content of the popup. Add any content or functionality you
          want here.
        </p>
        <button
          onClick={togglePopup}
          className="mt-4 rounded-3xl border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
