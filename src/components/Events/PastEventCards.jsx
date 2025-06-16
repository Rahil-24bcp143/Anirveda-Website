import React from "react";
import { pastEvents } from "../../data/pastEvents";

export default function PastEventCards() {
  const allPastEvents = pastEvents.map((event, index) => (
    <div key={index} className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="max-w-xs rounded-md shadow-md bg-black text-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,255,255,0.5)]">
        <img
          src={event.img}
          alt="content"
          className="object-cover object-center w-full rounded-t-md bg-black"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="break-words text-3xl font-semibold tracking-wide text-primary">{event.title}</h2>
            <p className="break-words bg-black">
              {event.description.length > 500
                ? `${event.description.slice(0, 500)}...`
                : event.description}
            </p>
          </div>
          {/* <button
            type="button"
            className="rounded-3xl border border-primary px-7 pt-1 pb-[6px] text-lg text-primary hover:bg-primary hover:text-white hover:duration-300"
          >
            Read more
          </button> */}
        </div>
      </div>
    </div>
  ));

  return <div className="flex flex-wrap justify-center gap-8">{allPastEvents}</div>;
}
