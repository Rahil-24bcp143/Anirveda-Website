import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import UpcomingEventsTimeline from "../Events/UpcomingEventCards"

import React from "react";

const StaggeredDropDown = () => {
  const [open, setOpen] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleToggle = (e) => {
    // Prevent the default browser behavior
    e.preventDefault();
    
    // If dropdown is currently open and user is scrolled down past the dropdown
    if (open && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const isButtonOffscreen = buttonRect.top < 0 || buttonRect.bottom > window.innerHeight;
      
      // Only scroll if the button is not fully visible in viewport
      if (isButtonOffscreen) {
        setIsScrolling(true);
        // Scroll to a position where button is visible but don't go all the way to top
        const scrollTarget = Math.max(0, window.scrollY + buttonRect.top - 100);
        
        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });

        // Wait for the scroll to complete before toggling
        setTimeout(() => {
          setIsScrolling(false);
          setOpen(false);
        }, 400);
        return;
      }
    }

    // Toggle the dropdown state
    setOpen((prev) => !prev);
  };

  // 🆕 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="mt-20 mb-20 bg-black px-4 relative" ref={wrapperRef}>
      {/* Sticky Button */}
      <div className="top-0 z-50 bg-black py-2 will-change-transform">
        <button
          ref={buttonRef}
          onClick={(e) => handleToggle(e)}
          className="flex justify-center text-2xl items-center gap-2 px-4 py-5 rounded-2xl transition-all duration-300 hover:bg-amber-500/10 hover:text-amber-300 w-full"
          style={{ color: "rgb(201, 135, 43)" }}
          type="button" /* Explicitly set button type to prevent form submission behavior */
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-2xl">Upcoming Events</span>
            <motion.span 
              animate={open ? { rotate: 180 } : { rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              <FiChevronDown />
            </motion.span>
          </div>
        </button>
      </div>

      {/* Full-height dropdown with hardware-accelerated smooth collapse */}
      <motion.div
        ref={dropdownRef}
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        style={{
          willChange: "height, opacity",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased"
        }}
        transition={{ 
          height: {
            duration: 0.4, 
            ease: [0.16, 1, 0.3, 1] // Custom bezier curve for smoother motion
          },
          opacity: {
            duration: 0.3,
            ease: "easeOut"
          }
        }}
        className="overflow-hidden mt-4"
      >
        <div className="pb-4 transform-gpu">
          <UpcomingEventsTimeline />
        </div>
      </motion.div>
    </div>
  );
};

export default StaggeredDropDown;
