import React, { useState } from "react";
import { pastEvents } from "../../data/pastEvents";

export default function PastEventCards() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="w-full px-4 mb-10">
      <div className="flex justify-center items-center">
        <h1 className="font-bebas text-4xl text-primary sm:text-5xl">
          Our Past Events
        </h1>
      </div>

      <div className="pastEventsButton flex justify-center items-center mt-12 mb-20">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border-2 border-primary px-7 py-2 text-lg text-gray-100 hover:bg-primary hover:text-gray-900 transition duration-300"
        >
          {isOpen ? "Hide Past Events" : "View Past Events"}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-wrap items-start justify-center gap-8">
          {pastEvents.map((event, index) => {
            const isLong = event.description.length > 50;
            const isExpanded = expandedIndex === index;
            const textToShow =
              isExpanded || !isLong
                ? event.description
                : event.description.slice(0, 100) + "...";

            return (
              <div
                key={index}
                className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 flex self-start"
              >
                {/* <div className="relative w-full flex flex-col h-full rounded-md shadow-md bg-black text-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgb(182,149,117)]]"> */}
                <div class="relative w-full flex flex-col h-full rounded-md shadow-md bg-black text-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-[1px_2px_10px_rgb(245,158,11)]">
    
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full object-cover rounded-t-md"
                    style={{ height: "160px" }}
                  />

                  {/* add extra bottom padding so text never overlaps the button */}
                  <div className="flex-1 p-6 pb-16 overflow-hidden">
                    <h2 className="break-words text-2xl font-semibold tracking-wide text-primary">
                      {event.title}
                    </h2>
                    <p className="mt-4 text-gray-100">{textToShow}</p>
                  </div>

                  {isLong && (
                    <button 
                      onClick={() =>
                        setExpandedIndex(isExpanded ? null : index)
                      }
                      className="absolute bottom-2 right-2 rounded-3xl border-2 border-primary px-4 py-1 text-black bg-primary"
                    >
                      {isExpanded ? "Show Less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}