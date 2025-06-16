import React from "react";
import EventsCards from "./EventsCards";

export default function Events() {
  return (
    <div id="events" className="container mx-auto px-5 pb-12 bg-gradient-to-b from-black via-black/90 to-black/80 py-16">
      <div className="mb-20 flex w-full flex-wrap">
        <div className="mb-6 w-full lg:mb-0 lg:w-1/2 2xl:pl-4">
          <h1 className="mb-2 font-Bebas text-4xl font-medium text-primary sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Our Events
          </h1>
          <div className="h-1 w-20 rounded bg-gradient-to-r from-primary to-secondary"></div>
        </div>
      </div>
      <EventsCards />
    </div>
  );
}
