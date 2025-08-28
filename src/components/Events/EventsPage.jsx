import React from "react";
import PastEventsCards from "./PastEventCards";
import UpcomingEventsTimeline from "./UpcomingEventCards.jsx";

export default function EventsSection(){
  return (
    <section>
      <div className="container mx-auto px-5 py-16 sm:py-20">
        {/* <div className="bg-gradient-to-br from-black via-black to-black py-16 rounded-2xl">
          <h2 className="mb-8 text-center font-Bebas text-4xl font-medium text-primary">
            Events Timeline
          </h2>
          <Timeline events={events} />
        </div> */}
      <UpcomingEventsTimeline />
      </div>
      <div className="container mx-auto px-5">
        <div className="mb-10 flex w-full lg lg:mb-0 lg:w-1/2 2xl:pl-4"></div>
        <PastEventsCards />
      </div> 
    </section>
  );
}