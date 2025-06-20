import React, { useState } from "react";
import { pastEvents } from "../../data/pastEvents";
import { i } from "framer-motion/client";
import Card from "../Card/Card";

export default function PastEventCards() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
      <div className="w-full px-4 mb-10">
        <div className="flex justify-center items-center">
          <h1 className="font-bebas text-4xl text-primary sm:text-5xl">
            Our Sponsors
          </h1>
        </div>
  
        <div className="flex flex-wrap items-start justify-center gap-8 mt-12">
          {pastEvents.map((pastEvent, index) => ( 
            <Card
              key={index} // Don't forget the key!
              item={pastEvent} // Pass a single sponsor object as 'item' prop
              descriptionLength={100}
              showReadMore={true}
              showExternalLinks={true}
              
            />
          ))}
        </div>
      </div>
    );
}