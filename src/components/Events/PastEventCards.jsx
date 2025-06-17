import React, { useState } from "react";
import { pastEvents } from "../../data/pastEvents";

export default function PastEventCards() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full px-4 mb-10">
      <div className="flex justify-center items-center">
        <h1 className = "font-bebas text-4xl text-primary sm:text-5xl">Our Past Events</h1>
      </div>
      <div className="pastEventsButton flex justify-center items-center mt-12 mb-20">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border-2 border-primary px-7 py-2 text-lg text-gray-100 hover:bg-primary hover:text-gray-900 hover:duration-300">
          {isOpen ? "Hide Past Events" : "View Past Events"}
        </button>
      </div>
      {/* The drawer content */}
      {isOpen && (
        <div className="flex flex-wrap justify-center gap-8">
          {pastEvents.map((event, index) => {
            const isLong = event.description.length > 500;

            return (
              <div
                key={index}
                className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 flex-grow">
                <div className="max-w-xs h-96 rounded-md shadow-md bg-black text-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,255,255,0.5)] flex flex-col">
                    <img
                        src={event.img}
                        alt="Event"
                        className="object-cover object-center w-full rounded-t-md bg-black"
                        style={{height:'160px'}}
                    />
                    <div className="flex-1 p-6 space-y-4">
                        <h2 className="break-words text-2xl font-semibold tracking-wide text-primary">
                         {event.title}
                        </h2>
                        <p className="break-words bg-black">
                         {isLong
                           ? `${event.description.slice(0, 500)}...`
                           : event.description}
                        </p>

                        {isLong && (
                          <button
                            className="rounded-3xl border border-gray-500 px-4 py-1 text-gray-500 hover:bg-gray-500 hover:text-gray-100 hover:duration-300">
                            Read more
                          </button>
                        )}

                        {/* Fill the space if content is short */}
                        <div className="flex-grow" />
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
