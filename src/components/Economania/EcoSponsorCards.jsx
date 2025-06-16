import React, { useState } from "react";
import { sponsors } from "../../data/ecoSponsors";
import { Icon } from "@iconify/react"; 

export default function EcoSponsorCards() {
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (index) => {
    setExpanded((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const pastSponsors = sponsors.map((sponsor, index) => (
    <div key={index} className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="max-w-xs rounded-xl shadow-md bg-black text-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,255,255,0.5)]">
        <img
          src={sponsor.img}
          alt="content"
          className="object-cover object-center w-full rounded-t-md bg-black"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="break-words text-3xl font-semibold tracking-wide text-primary">
              {sponsor.title}
            </h2>
            <div
              className="break-words bg-black text-gray-300"
              style={{
                maxHeight: expanded[index] ? "none" : "100px",
                overflow: expanded[index] ? "visible" : "hidden",
              }}
            >
              {sponsor.description}
            </div>
            <button
              onClick={() => toggleReadMore(index)}
              className="mt-2 text-primary underline"
            >
              {expanded[index] ? "Read Less" : "Read More"}
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {sponsor.website && (
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl border border-primary px-4 py-1 text-lg text-primary hover:bg-primary hover:text-white flex items-center gap-2"
              >
                <Icon icon="mdi:web" className="text-xl" />
                Website
              </a>
            )}
            {sponsor.instagram && (
              <a
                href={sponsor.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl border border-primary px-4 py-1 text-lg text-primary hover:bg-primary hover:text-white flex items-center gap-2"
              >
                <Icon icon="mdi:instagram" className="text-xl" />
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  ));

  return <div className="flex flex-wrap justify-center gap-8">{pastSponsors}</div>;
}