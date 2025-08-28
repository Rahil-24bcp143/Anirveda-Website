import React from "react";
import Navbar from "../components/Navbar";
import AnnouncementBar from "../components/AnnouncementBar";
import ProfileCard from "../components/Committee/ProfileCard";
import advisors from "../data/committee/advisors";
import executives from "../data/committee/executives";
import Departments from "../components/Committee/Departments";
import ContactUs from "../components/ContactUs";

export default function Committee() {
  return (
    <div className="bg-black font-Lato">
      <AnnouncementBar />
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex items-center justify-center h-screen bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
        <div className="relative text-center text-white px-6 sm:px-12 lg:px-20">
          <h1 className="font-Bebas text-[4rem] uppercase text-primary sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-tight drop-shadow-lg">
            Committee
          </h1>
          <h3 className="mt-4 text-lg font-light text-secondary sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            The amazing team that works behind the scenes to make it possible.
          </h3>
        </div>
      </div>

      {/* Profile Cards Section */}
      <div className="py-12 bg-black">
        <ProfileCard data={executives} heading={"Executives"} />
        <ProfileCard data={advisors} heading={"Advisors"} />
      </div>

      {/* Departments Section */}
      <div className="py-16 bg-black">
        <Departments />
      </div>

      {/* Footer */}
      <ContactUs />
    </div>
  );
}
