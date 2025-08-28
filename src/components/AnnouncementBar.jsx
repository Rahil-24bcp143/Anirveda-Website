import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const AnnouncementBar = () => {
  const announcements = [
    {
      id: 1,
      text: "🎉 Blogs Section Coming Soon - Stay tuned for insightful articles on tech & economics!",
      priority: "high"
    },
    {
      id: 2,
      text: "📋 Subcom Interviews Coming Up - Prepare to join our amazing team!",
      priority: "medium"
    },
    {
      id: 3,
      text: "🎯 Introvia on 29th August, 4:00 PM - 6:00 PM - Don't miss this exciting event!",
      priority: "high"
    },
    {
      id: 4,
      text: "🚀 Economania 2025 - Registration opens soon for our flagship event!",
      priority: "medium"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change announcement every 4 seconds

    return () => clearInterval(interval);
  }, [announcements.length, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleShowAnnouncements = () => {
    console.log('Show announcements clicked');
    setIsVisible(true);
    setCurrentIndex(0);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? announcements.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === announcements.length - 1 ? 0 : currentIndex + 1);
  };

  const currentAnnouncement = announcements[currentIndex];

  return (
    <>
      {/* Content area */}
      <div className="transition-all duration-500 ease-in-out">
        {/* Sleek announcement bar */}
        <div 
          className={`bg-gradient-to-r from-primary to-secondary text-black transition-all duration-500 ease-out overflow-hidden ${
            isVisible 
              ? 'h-14 md:h-14 sm:h-16 opacity-100 py-2 px-2 md:px-4' 
              : 'h-0 opacity-0 py-0 px-2 md:px-4'
          }`}
        >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-10 md:h-10 sm:h-12">
          {/* Sleek indicator dots - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2 mr-4">
            {announcements.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                  index === currentIndex 
                    ? "bg-black" 
                    : "bg-black bg-opacity-40 hover:bg-opacity-70"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to announcement ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Clean announcement text - Responsive */}
          <div className="flex-1 min-w-0 text-center px-2 md:px-0">
            <p className="font-Abel text-sm md:text-lg font-medium truncate">
              {currentAnnouncement.text}
            </p>
          </div>

          {/* Minimal controls - Compact on mobile */}
          <div className="flex items-center space-x-1 ml-2 md:ml-4">
            <button
              onClick={handlePrevious}
              className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-200"
              aria-label="Previous"
            >
              <Icon icon="carbon:chevron-left" className="text-black text-xs md:text-sm" />
            </button>
            
            <button
              onClick={handleNext}
              className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-200"
              aria-label="Next"
            >
              <Icon icon="carbon:chevron-right" className="text-black text-xs md:text-sm" />
            </button>

            <button
              onClick={handleClose}
              className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-black bg-opacity-20 hover:bg-red-500 hover:bg-opacity-25 flex items-center justify-center transition-all duration-200 ml-1 md:ml-2"
              aria-label="Close"
            >
              <Icon icon="carbon:close" className="text-black text-xs md:text-sm" />
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementBar;
