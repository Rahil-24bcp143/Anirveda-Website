import React, { useState } from "react";
import { Icon } from "@iconify/react";


export default function Card({
  item, 
  descriptionLength = 100,
  showReadMore = true,
  showExternalLinks = true,
  titleKey = "title",
  descriptionKey = "description",
  imageKey = "img",
  websiteKey = "website" || "www.google.com",
  instagramKey = "instagram",
}) {
  const [isExpanded, setIsExpanded] = useState(false); 

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const isLong = item[descriptionKey].length > descriptionLength;
  const textToShow =
    isExpanded || !isLong
      ? item[descriptionKey]
      : item[descriptionKey].slice(0, descriptionLength) + "...";

  const hasExternalLinks = showExternalLinks && (item[websiteKey] || item[instagramKey]);

  return (
    <div className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 flex self-stretch">
      <div className="relative w-full flex flex-col h-full rounded-md shadow-md bg-black text-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-[1px_2px_10px_rgb(245,158,11)]">
        <img
          src={item[imageKey]}
          alt={item[titleKey]}
          className="w-full object-cover rounded-t-md"
          style={{ height: "160px" }}
        />

       
        <div className="flex-1 p-6 pb-4 overflow-hidden flex flex-col">
          <h2 className="break-words text-2xl font-semibold tracking-wide text-primary mb-2">
            {item[titleKey]}
          </h2>
          <p className="mt-2 text-gray-100 flex-grow">{textToShow}</p>
        </div>

        
        <div className="p-6 pt-0 flex flex-wrap gap-2 justify-end items-center">
          {showReadMore && isLong && (
            <button
              onClick={toggleReadMore}
              className="rounded-3xl border-2 border-primary px-4 py-1 text-black bg-primary flex-shrink-0"
            >
              {isExpanded ? "Show Less" : "Read more"}
            </button>
          )}

          {hasExternalLinks && (
            <>
              {item[websiteKey] && (
                <a
                  href={item[websiteKey]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-3xl border-2 border-primary px-4 py-1 text-black bg-primary flex items-center gap-2 flex-shrink-0"
                >
                  <Icon icon="mdi:web" className="text-xl" />
                  Website
                </a>
              )}
              {item[instagramKey] && (
                <a
                  href={item[instagramKey]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-3xl border-2 border-primary px-4 py-1 text-black bg-primary flex items-center gap-2 flex-shrink-0"
                >
                  <Icon icon="mdi:instagram" className="text-xl" />
                  Instagram
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}