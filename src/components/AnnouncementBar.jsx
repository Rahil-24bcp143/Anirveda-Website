import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const AnnouncementBar = () => {
  const announcements = [
   
  
    
    {
      id: 1,
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
      {/* Elegant notification button - Mobile optimized */}
      {!isVisible && (
        <button 
          onClick={handleShowAnnouncements}
          className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 bg-gradient-to-r from-primary via-secondary to-primary w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 backdrop-blur-sm"
          aria-label="Show announcements"
        >
          <Icon icon="carbon:notification" className="text-black text-base sm:text-lg md:text-xl animate-pulse" />
          {/* Small notification dot for mobile */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75 sm:hidden"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full sm:hidden"></div>
        </button>
      )}
      
      {/* Content area */}
      <div className="transition-all duration-500 ease-in-out">
        {/* Elegant Mobile-First Announcement Bar */}
        <div 
          className={`bg-gradient-to-r from-primary via-secondary to-primary text-black transition-all duration-500 ease-out overflow-hidden shadow-lg border-b border-black/10 ${
            isVisible 
              ? 'h-12 sm:h-14 md:h-16 opacity-100 py-1 sm:py-2 px-3 sm:px-4 md:px-6' 
              : 'h-0 opacity-0 py-0 px-3 sm:px-4 md:px-6'
          }`}
        >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full gap-2 sm:gap-3 md:gap-4">
          {/* Priority indicator - Mobile optimized */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:mr-4">
            {/* Mobile: Single priority dot */}
            <div className="md:hidden">
              <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-pulse ${
                currentAnnouncement.priority === 'high' ? 'bg-red-500' : 'bg-green-500'
              }`}></div>
            </div>
            
            {/* Desktop: All indicator dots */}
            <div className="hidden md:flex items-center space-x-2">
              {announcements.map((announcement, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 transform ${
                    index === currentIndex 
                      ? `scale-110 ${announcement.priority === 'high' ? 'bg-red-500 ring-2 ring-red-200' : 'bg-green-500 ring-2 ring-green-200'}`
                      : 'bg-black/30 hover:bg-black/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to announcement ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Mobile-optimized announcement text */}
          <div className="flex-1 min-w-0 flex items-center justify-center px-1 sm:px-2">
            <div className="flex items-center space-x-1 sm:space-x-2 w-full justify-center">
              {/* Desktop priority bar */}
              <div className={`hidden md:block h-3 w-0.5 rounded-full animate-pulse ${
                currentAnnouncement.priority === 'high' ? 'bg-red-500' : 'bg-green-500'
              }`}></div>
              
              <p className={`font-Abel text-xs sm:text-sm md:text-base lg:text-lg font-bold text-center leading-tight sm:leading-normal tracking-wide transition-all duration-300 ${fadeStyles[fadeState]}`}>
                <span className="block sm:inline">
                  {/* Mobile: Truncate long text more aggressively */}
                  <span className="sm:hidden">
                    {currentAnnouncement.text.length > 45 
                      ? `${currentAnnouncement.text.substring(0, 42)}...` 
                      : currentAnnouncement.text}
                  </span>
                  {/* Tablet and up: Show more text */}
                  <span className="hidden sm:inline">
                    {currentAnnouncement.text}
                  </span>
                </span>
              </p>
            </div>
          </div>

          {/* Compact elegant controls */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
            <button
              onClick={handlePrevious}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-white/50"
              aria-label="Previous"
            >
              <Icon icon="carbon:chevron-left" className="text-black text-xs sm:text-sm md:text-base" />
            </button>
            
            <button
              onClick={handleNext}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-white/50"
              aria-label="Next"
            >
              <Icon icon="carbon:chevron-right" className="text-black text-xs sm:text-sm md:text-base" />
            </button>

            <button
              onClick={handleClose}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white/20 hover:bg-red-400/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-red-400/50 ml-0.5 sm:ml-1"
              aria-label="Close"
            >
              <Icon icon="carbon:close" className="text-black text-xs sm:text-sm md:text-base" />
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementBar;
