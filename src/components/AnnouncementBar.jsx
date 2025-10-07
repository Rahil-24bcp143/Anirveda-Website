import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const AnnouncementBar = () => {
  const announcements = [
    {
      id: 1,
      text: "🚀 Tesseract 2025 - Registration open now for our flagship events!",
      priority: "high"
    },
   
    {
      id: 2,
      text: "💵 Take the MOCK-RBI Challenge on 10th October.",
      priority: "high"
    },
    
    {
      id: 3,
      text: "🎉 Blogs Section Coming Soon - Stay tuned for insightful articles on tech & economics!",
      priority: "low"
    }
  
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    if (!isVisible) return;
    
    const transitionInterval = 5000; // Total time for each announcement (5 seconds)
    const fadeTime = 400; // Time for fade transition (400ms)
    
    const interval = setInterval(() => {
      // Start fade out transition
      setFadeState('fade-out');
      
      // Change the index after fade out completes
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
        );
        setFadeState('fade-in');
      }, fadeTime);
      
    }, transitionInterval);

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

  // CSS for fade animations
  const fadeStyles = {
    'fade-in': 'opacity-100 translate-y-0',
    'fade-out': 'opacity-0 -translate-y-1'
  };

  return (
    <>
      {/* Expand button - Only shown when announcement bar is closed */}
      {!isVisible && (
        <button 
          onClick={handleShowAnnouncements}
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-primary to-secondary w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
          aria-label="Show announcements"
        >
          <Icon icon="carbon:notification" className="text-white text-lg" />
        </button>
      )}
      
      {/* Content area */}
      <div className="transition-all duration-500 ease-in-out">
        {/* Sleek announcement bar */}
        <div 
          className={`bg-gradient-to-r from-primary via-secondary to-primary text-black transition-all duration-500 ease-out overflow-hidden shadow-md border-b border-secondary-15 ${
            isVisible 
              ? 'h-14 md:h-14 sm:h-16 opacity-100 py-2 px-2 md:px-4' 
              : 'h-0 opacity-0 py-0 px-2 md:px-4'
          }`}
        >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-10 md:h-10 sm:h-12">
          {/* Enhanced indicator dots with priority colors - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2 mr-4">
            {announcements.map((announcement, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 transform ${index === currentIndex ? 'scale-110' : ''} ${
                  index === currentIndex 
                    ? announcement.priority === 'high' ? "bg-red-500 ring-2 ring-red-200" : "bg-green-500 ring-2 ring-green-200"
                    : "bg-black bg-opacity-25 hover:bg-opacity-40"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to announcement ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Enhanced announcement text - Responsive */}
          <div className="flex-1 min-w-0 text-center px-2 md:px-0 flex items-center justify-center">
            <div className="inline-flex items-center space-x-2">
              <div className={`hidden md:block h-4 w-1 rounded-full ${currentAnnouncement.priority === 'high' ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
              <p className={`font-Abel text-sm md:text-lg font-semibold truncate tracking-wide drop-shadow-sm transition-all duration-300 ${fadeStyles[fadeState]}`}>
                {currentAnnouncement.text}
              </p>
            </div>
          </div>

          {/* Enhanced controls - Elegant on all devices */}
          <div className="flex items-center space-x-2 ml-2 md:ml-4">
            <button
              onClick={handlePrevious}
              className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-black bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Previous"
            >
              <Icon icon="carbon:chevron-left" className="text-black text-xs md:text-sm" />
            </button>
            
            <button
              onClick={handleNext}
              className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-black bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Next"
            >
              <Icon icon="carbon:chevron-right" className="text-black text-xs md:text-sm" />
            </button>

            <button
              onClick={handleClose}
              className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-black bg-opacity-10 hover:bg-red-400 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 ml-1 md:ml-2"
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
