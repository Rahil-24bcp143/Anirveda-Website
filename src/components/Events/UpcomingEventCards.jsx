import React, { useState } from "react";
import upcomingEvents from "../../data/upcomingEvents";

export default function UpcomingEventCards() {
  const [expandedEvents, setExpandedEvents] = useState({});

  const toggleReadMore = (eventId) => {
    setExpandedEvents(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  return (
    <div className="relative flex flex-wrap justify-center gap-8 p-6">
      {upcomingEvents.length === 0 ? (
        <h1 className="mt-8 text-center font-Lato text-2xl font-bold text-secondary xl:text-3xl">
          No Upcoming Events. Stay Tuned for more updates.
        </h1>
      ) : (
        upcomingEvents.map((event) => {
          const isExpanded = expandedEvents[event.id] || false;
          const shouldShowMore = event.description.length > 150;
          const displayDescription = isExpanded 
            ? event.description 
            : `${event.description.slice(0, 150)}${shouldShowMore ? '...' : ''}`;

          return (
            <div key={event.id} className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="max-w-xs rounded-md shadow-md bg-black text-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,255,255,0.5)]">
                <img
                  src={event.img}
                  alt="content"
                  className="object-cover object-center w-full rounded-t-md bg-black"
                />
                <div className="flex flex-col justify-between p-6 space-y-8">
                  <div className="space-y-2">
                    <h2 className="break-words text-3xl font-semibold tracking-wide text-primary">
                      {event.title}
                    </h2>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>
                        <span className="font-semibold">Date:</span> {event.date}
                      </p>
                      <p>
                        <span className="font-semibold">Time:</span> {event.timing}
                      </p>
                      <p>
                        <span className="font-semibold">Venue:</span> {event.venue}
                      </p>
                    </div>
                    <div className="break-words bg-black">
                      <p>{displayDescription}</p>
                      {shouldShowMore && (
                        <button
                          onClick={() => toggleReadMore(event.id)}
                          className="mt-2 text-primary hover:text-cyan-400 focus:outline-none"
                        >
                          {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                  </div>
                  <a
                    href={`${event.registrationLink}`}
                    className="rounded-3xl border border-primary px-7 pt-1 pb-[6px] text-lg text-primary hover:bg-primary hover:text-white hover:duration-300 text-center"
                  >
                    Register here
                  </a>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}