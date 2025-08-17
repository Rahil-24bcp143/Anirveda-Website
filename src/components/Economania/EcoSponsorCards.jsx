import React from "react";
import { sponsors } from "../../data/ecoSponsors";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function EcoSponsorCards() {
  return (
    <div className="py-12 px-4 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Proud Sponsors</h2>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          We extend our heartfelt gratitude to our sponsors for their invaluable support and partnership.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8">
        {sponsors.map((sponsor, index) => {
          return (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="w-full sm:w-[280px] md:w-[300px] lg:w-[320px]"
            >
              {/* Custom card with proper styling */}
              <div className="h-full bg-tertiary rounded-xl overflow-hidden shadow-lg border border-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
                {/* Logo area */}
                <div className="h-[180px] w-full flex items-center justify-center bg-black p-6">
                  <img 
                    src={sponsor.img} 
                    alt={sponsor.title} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {sponsor.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-secondary text-sm mb-5 line-clamp-4">
                    {sponsor.description}
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex gap-4 mt-4 justify-center">
                    {/* <button className="px-4 py-2 bg-primary text-black rounded-full text-sm font-semibold hover:bg-primary/80 transition-colors flex items-center gap-2">
                      Read more
                    </button> */}
                    
                    {sponsor.website && (
                      <a 
                        href={sponsor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary text-black rounded-full text-sm font-semibold hover:bg-primary/80 transition-colors flex items-center gap-2"
                      >
                        <Icon icon="mdi:web" className="text-lg" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}