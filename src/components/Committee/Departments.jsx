import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Departments() {
  const [open, setOpen] = useState(false);

  const departments = [
    { id: 2, link: "/em-logs", name: "Event Management & Creative" },
    { id: 3, link: "/dm", name: "Digital Marketing" },
    { id: 4, link: "/pr", name: "Public Relations" },
    { id: 5, link: "/cnd", name: "Content & Documentation" },
    { id: 6, link: "/tech", name: "Technical" },
    { id: 8, link: "/gd", name: "Graphics Design & Video Editing" },
    { id: 9, link: "/sponsorship", name: "Sponsorship" },
  ];

  const total = departments.length;
  const columns = 3;

  const departmentsList = departments.map((department, index) => {
    const isLast = index === total - 1;
    const isAloneInLastRow = total % columns === 1 && isLast;

    return (
      <div
        key={department.id}
        className={`${isAloneInLastRow ? "md:col-start-2" : ""}`}
      >
        <Link to={department.link}>
          <div className="cursor-pointer rounded-3xl bg-gray-600 p-6 text-center hover:scale-110 hover:bg-primary hover:duration-700 lg:p-12">
            {department.name}
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="px-4 bg-black text-primary">
      {/* Dropdown Toggle Button */}
      <div className="sticky top-0 z-100 bg-black py-2">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex justify-center items-center gap-2 w-full px-4 rounded-2xl  transition duration-300"
        >
          <h1 className="bg-black text-center font-Bebas text-[5rem] text-8xl font-light uppercase text-primary">Departments</h1>
          <motion.span animate={open ? { rotate: 180 } : { rotate: 0 }}>
            <FiChevronDown size={24} />
          </motion.span>
        </button>
      </div>

      {/* Dropdown Content */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="mt-5 grid w-full grid-cols-1 gap-2 p-3 font-Abel text-lg font-extrabold text-black opacity-95 duration-300 sm:grid-cols-2 sm:px-5 md:grid-cols-3 lg:gap-5 lg:text-xl">
          {departmentsList}
        </div>
      </motion.div>
    </div>
  );
}
