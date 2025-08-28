import { motion } from "framer-motion";
import React from "react";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";

const UpcomingEventsTimeline = () => {
const upcomingEvents = [
    {
      id: 3,
      img: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756301783/TBA-Soon_watubc.png",
      title: "Breach 2026",
      registrationLink: "https://unstop.com/o/4Qfa2F9?lb=VpYCae40&utm_medium=Share&utm_source=shortUrl",
      date: "TBA",
      timing: "TBA",
      venue: "TBA",
      description: "Stay Connected to know more...",
      type: "Hackathon",
      isActive: false
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756301783/TBA-Soon_watubc.png",
      title: "Mock RBI",
      registrationLink: "#",
      date: "TBA",
      timing: "TBA",
      venue: "TBA",
      description: "Stay Connected to know more...",
      type: "Simulation",
      isActive: false
    },
    {
      id: 4,
      img: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756301783/TBA-Soon_watubc.png",
      title: "Speaker Session",
      registrationLink: "https://docs.google.com/forms/d/1qmwO1sETLGyDnkCt15wHWAb-J74KSHvy8mhs3_WBNPM/viewform",
      date: "TBA",
      timing: "TBA",
      venue: "TBA",
      description: "Stay Connected to know more...",
      type: "Workshop",
      isActive: false
    },
    {
      id: 5,
      img: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756301783/TBA-Soon_watubc.png",
      title: "Space Odyssey",
      date: "TBA",
      timing: "TBA",
      venue: "TBA",
      description: "Stay Connected to know more...",
      type: "Game",
      isActive: false
    },
    {
      id: 6,
      img: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756301783/TBA-Soon_watubc.png",
      title: "Parallel Paradigm",
      registrationLink: "#",
      date: "TBA",
      timing: "TBA",
      venue: "TBA",
      description: "Stay Connected to know more...",
      type: "Collaboration",
      isActive: false
    },
    {
      id: 7,
      img: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756301783/TBA-Soon_watubc.png",
      title: "GalaxEcon",
      registrationLink: "#",
      date: "TBA",
      timing: "TBA",
      venue: "TBA",
      description: "Stay Connected to know more...",
      type: "Competition",
      isActive: false
    }
  ];

  return (
    <section className="py-10 px-4 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Mark your calendar for these exciting events
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-400 transform -translate-x-1/2"></div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex ${
                  index % 2 === 0
                    ? "md:justify-end md:pr-12"
                    : "md:justify-start md:pl-12"
                }`}
              >
                {/* Card */}
                <div className="bg-tertiary rounded-3xl shadow-2xl w-full md:w-10/12 relative border border-amber-600/30 overflow-hidden">
                  {/* Image */}
                  <div className="h-48 overflow-hidden rounded-t-3xl">
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-3">
                      {event.title}
                    </h3>
                    <p className="text-secondary mb-6 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-6 text-sm text-primary">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-secondary" />
                        {event.timing}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-secondary" />
                        {event.venue}
                      </div>
                    </div>

                    {event.isActive ? (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black px-6 py-3 rounded-full font-bold shadow-lg"
                      >
                        Register Now
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black px-6 py-3 rounded-full font-bold cursor-not-allowed shadow-lg"
                      >
                        Coming Soon...
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsTimeline;
