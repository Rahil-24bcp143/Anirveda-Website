import React, { useState } from "react";
import { pastEvents } from "../../data/pastEvents";
import { i } from "framer-motion/client";
import Card from "../Card/Card";

export default function PastEventCards() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null); // Not directly used in this component, but kept as per your original.

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-4 mb-10">
      <div className="flex justify-center items-center">
        <button
          onClick={toggleDrawer}
          className="font-bebas text-2xl sm:text-3xl px-5 py-2 rounded-lg
                     border-2 border-primary text-primary
                     hover:bg-primary hover:text-white transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                     shadow-md hover:shadow-lg
                     flex items-center gap-2"
          aria-expanded={isOpen}
          aria-controls="past-events-drawer"
        >
          Our Past Events
          <span
            className={`transition-transform duration-300 text-3xl ${
              isOpen ? "rotate-180" : "rotate-0" // Now, when open, it rotates 180 degrees from its initial downward state
            }`}
            aria-hidden="true"
          >
            &#x25BC; {/* Unicode for a solid downward-pointing triangle */}
          </span>
        </button>
      </div>


      {isOpen && (
        <div
          id="past-events-drawer" // ID for aria-controls
          className="flex flex-wrap items-start justify-center gap-8 mt-8
                     animate-fadeIn transition-all duration-500 ease-in-out"
        >
          {pastEvents.map((pastEvent, index) => (
            <Card
              key={index}
              item={pastEvent}
              descriptionLength={100}
              showReadMore={true}
              showExternalLinks={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}