import React from "react";
import { sponsors } from "../../data/sponsors";
import Card from "../Card/Card"; // Adjust path as needed

export default function SponsorsCards() {
  return (
    <div className="w-full px-4 mb-10">
      <div className="flex justify-center items-center">
        <h1 className="font-bebas text-4xl text-primary sm:text-5xl">
          Our Past Sponsors
        </h1>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-8 mt-12">
        {sponsors.map((sponsor, index) => ( // Loop through sponsors data here
          <Card
            key={index} // Don't forget the key!
            item={sponsor} // Pass a single sponsor object as 'item' prop
            descriptionLength={10000}
            showReadMore={false}
            showExternalLinks={true}
            // titleKey, descriptionKey, etc. are implicitly 'title', 'description', etc.
            // based on your sponsors data structure, so no need to pass if they match defaults.
          />
        ))}
      </div>
    </div>
  );
}