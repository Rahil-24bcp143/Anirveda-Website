import React from "react";
import Navbar from "../components/Navbar";
import SpinWheel from "../components/GalaxEcon/SpinWheel";
import ContactUs from "../components/ContactUs";

const GalaxEcon = () => {
  return (
    <div className="bg-black text-white min-h-screen font-Lato">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header className="text-center py-12 bg-tertiary">
        <h1 className="text-4xl font-Bebas text-primary">GalaxEcon</h1>
        <p className="text-lg text-secondary mt-4">
          A collaborative event by <span className="text-primary">Anirveda</span> and{" "}
          <span className="text-primary">Brahmaand</span> 
        </p>
        <p className="text-base text-gray-400 mt-2">
        Analyze costs, create budgets, and pitch innovative, feasible, and sustainable space industry ideas!
        </p>
      </header>

      {/* Spin the Wheel Section */}
      <section className="py-16">
        <h2 className="text-3xl font-Bebas text-center text-primary mb-8">
          Spin the Wheel to select the PROBLEM STATEMENT!
        </h2>
        <div className="max-w-lg mx-auto">
          <SpinWheel />
        </div>
      </section>

      <ContactUs/>
    </div>
  );
};

export default GalaxEcon;