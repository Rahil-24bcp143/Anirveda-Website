import React from "react";
import PastEventsCards from "./PastEventCards";
import UpcomingEventCards from "./UpcomingEventCards";
import Timeline from "./Timeline";

export default function EventsPage() {
  const events = [

    // Change the date relative to current date to do progress changes 
    { name: "Introvia", date: "July 5, 2024"},
    { name: "Bahikhata", date: "August 5, 2024"},
    { name: "Notion Workshop", date: "Sept 6, 2024"},
    { name: "Get! Set! Supply!!", date: "Oct 8, 2024"},
    { name: "Change my mind", date: "Oct 19, 2024"}, 
    { name: "Gloobalopoly", date: "Oct 20, 2024"},
    { name: "IPL Auction", date: "Nov 8, 2024"}, 
    { name: "CITYSCAPES", date: "Jan 24, 2025"},                                  
    { name: "Breach 2025", date: "March 21, 2025" },                                                                   
    { name: "Parallel Paradigm", date: "March 21, 2025"},                                                                   
    { name: "GalaxEcon", date: "March 22, 2025"},        
    { name: "Mock RBI", date: "March 22, 2025" }, 
    { name: "Speaker Session", date: "March 23, 2025"}                                      
  ];

  return (
    <section>
      <div className="container mx-auto px-5 py-16 sm:py-20">
        <div className="bg-gradient-to-br from-black via-black to-black py-16 rounded-2xl">
          <h2 className="mb-8 text-center font-Bebas text-4xl font-medium text-primary">
            Events Timeline
          </h2>
          <Timeline events={events} />
        </div>
        <UpcomingEventCards />
      </div>
      <div className="container mx-auto px-5">
        <div className="mb-10 flex w-full lg lg:mb-0 lg:w-1/2 2xl:pl-4"></div>
        <PastEventsCards />
      </div> 
    </section>
  );
}
