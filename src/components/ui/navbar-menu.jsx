"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children
}) => {
  const handleClick = () => {
    // Toggle the active state - if it's already active, set to null, otherwise set to this item
    setActive(active === item ? null : item);
  };
  
  return (
    <div className="relative">
      <motion.p
        onClick={handleClick}
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-[#B69575] hover:text-[#C9872B] hover:opacity-[0.9]">
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div
              className="absolute top-[calc(100%_+_1.2rem)] right-0 pt-4 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-[#0F0F0F] backdrop-blur-sm rounded-2xl overflow-hidden border border-[#C9872B]/[0.4] shadow-xl">
                <motion.div
                  layout
                  className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children
}) => {
  const menuRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown menu when clicking outside
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActive(null);
      }
    };
    
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActive]);
  
  return (
    <nav
      ref={menuRef}
      className="relative rounded-full border border-[#B69575]/[0.2] bg-[#0F0F0F] border-[#C9872B]/[0.3] flex justify-center space-x-6 px-8 py-4">
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-[#0F0F0F] dark:text-[#C9872B]">
          {title}
        </h4>
        <p className="text-[#8F7252] text-sm max-w-[10rem] dark:text-[#B69575]">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}) => {
  return (
    <a
      {...rest}
      className="text-[#8F7252] dark:text-[#B69575] hover:text-[#C9872B] transition-colors ">
      {children}
    </a>
  );
};
