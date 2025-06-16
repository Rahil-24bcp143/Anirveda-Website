import React, { useState } from "react";
import { economaniaEvents } from "../../data/economania";
import { Icon } from "@iconify/react";
import Popup from "./Popup";
import { motion } from "framer-motion";

export default function EventsCards() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const breachEvent = economaniaEvents.find(event => event.title === "Breach 2025");
  const otherEvents = economaniaEvents.filter(event => event.title !== "Breach 2025");

  const breachVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, rotate: 1, boxShadow: "0px 8px 20px rgba(0,255,255,0.3)" },
    tap: { scale: 0.95 },
  };

  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, rotate: 1, boxShadow: "0px 8px 20px rgba(0,255,255,0.3)" },
    tap: { scale: 0.95 },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, rotate: 1, boxShadow: "0px 8px 20px rgba(0,255,255,0.3)" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-col items-center w-full">
      {breachEvent && (
        <motion.div 
          key={breachEvent.id} 
          className="w-full p-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={breachVariants}
        >
          <motion.div
            className="w-full max-w-6xl mx-auto rounded-lg shadow-lg bg-gradient-to-b from-black/80 via-black/70 to-black/60 backdrop-blur-sm border border-gray-800 cursor-pointer"
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleCardClick(breachEvent)}
          >
            <img src={breachEvent.img} alt={breachEvent.title} className="object-cover w-full h-auto max-h-[300px] sm:h-[300px] rounded-t-lg" />
            <div className="p-6 space-y-4">
              <h2 className="text-4xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {breachEvent.title}
              </h2>
              <div className="flex items-center gap-2 text-lg text-gray-300">
                <Icon icon="mdi:calendar" className="text-primary" />
                <span>{breachEvent.date} | {breachEvent.timing}</span>
              </div>
              <a href={breachEvent.registrationLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-lg text-white hover:bg-gradient-to-l transition-all flex items-center justify-center gap-2">
                <Icon icon="mdi:account-plus-outline" className="text-2xl" />
                Register Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
        {otherEvents.map((event, index) => (
          <motion.div 
            key={event.id} 
            className="p-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={index % 2 === 0 ? cardVariantsLeft : cardVariantsRight}
          >
            <motion.div
              className="rounded-lg shadow-lg bg-gradient-to-b from-black/80 via-black/70 to-black/60 backdrop-blur-sm border border-gray-800 cursor-pointer"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleCardClick(event)}
            >
              <img src={event.img} alt={event.title} className="object-cover w-full h-48 rounded-t-lg" />
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {event.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Icon icon="mdi:calendar" className="text-primary" />
                  <span>{event.date} | {event.timing}</span>
                </div>
                {event.registrationLink && (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm text-white hover:bg-gradient-to-l transition-all flex items-center justify-center gap-2">
                    <Icon icon="mdi:account-plus-outline" className="text-lg" />
                    Register Now
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {isOpen && <Popup isOpen={isOpen} onClose={handleClose} eventDetails={selectedEvent} />}
    </div>
  );
}
