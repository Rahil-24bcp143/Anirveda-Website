import React, { useState } from "react";
import { pastEvents } from "../../data/pastEvents";

export default function PastEventCards() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMap, setExpandedMap] = useState({});

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
        <div className="flex flex-wrap justify-center gap-8">
          {pastEvents.map((event, index) => {
            const isLong = event.description.length > 50;
            const isExpanded = !!expandedMap[index];
            const textToShow =
              isExpanded || !isLong
                ? event.description
                : `${event.description.slice(0, 100)}...`;

            return (
              <div
                key={index}
                className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 flex"
              >
                {/* card container fills its flex cell */}
                <div
                  className="w-full flex flex-col h-full rounded-md shadow-md bg-black text-gray-100
                             transition-transform duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,255,255,0.5)]"
                >
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full object-cover rounded-t-md"
                    style={{ height: "160px" }}
                  />

                  {/* flex-col that pushes button to the bottom */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="break-words text-2xl font-semibold tracking-wide text-primary">
                        {event.title}
                      </h2>
                      <p className="mt-4 text-gray-100">{textToShow}</p>
                    </div>

                    {isLong && (
                      <button
                        onClick={() =>
                          setExpandedMap((prev) => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                        className="mt-6 self-start rounded-3xl border border-gray-500 px-4 py-1
                                   text-gray-500 hover:bg-gray-500 hover:text-gray-100 transition duration-200"
                      >
                        {isExpanded ? "Show Less" : "Read more"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}