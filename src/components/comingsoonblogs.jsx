import React from "react";
import Navbar from "./Navbar";
import AnnouncementBar from "./AnnouncementBar";

const ComingSoonBlogs = () => {
  return (
    <div className="min-h-screen bg-black font-Lato">
      <AnnouncementBar />
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center">
          <h1 className="font-Bebas text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] uppercase leading-none text-primary mb-8 tracking-wide">
            Coming Soon
          </h1>
          <p className="font-Abel text-xl md:text-2xl lg:text-3xl text-secondary max-w-2xl mx-auto leading-relaxed">
            We're working on something amazing! Our blogs section will be available soon with insightful articles on technology, economics, and innovation.
          </p>
          {/* <div className="mt-12">
            <div className="inline-block px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-black transition-all duration-300 cursor-pointer">
              <span className="font-Abel text-lg">Stay Tuned</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonBlogs;
