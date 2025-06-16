import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updatePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);

      setTrail((prevTrail) => [...prevTrail, newPosition].slice(-10));
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none mix-blend-difference"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        animate={{ boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)" }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />

      {trail.map((pos, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none opacity-50"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          animate={{
            scale: 0.9 - index * 0.08, 
            opacity: 0.5 - index * 0.05, 
            boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)",
          }}
          transition={{
            duration: 0.15 + index * 0.02, 
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}
