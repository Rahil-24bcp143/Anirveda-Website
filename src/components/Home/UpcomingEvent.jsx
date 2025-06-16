import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
const UpcomingEventsTimeline = () => {
  const upcomingEvents = [
    {
      id: 3,
      img: "/images/upcomingEvents/breach.jpg",
      title: "Breach 2025",
      registrationLink: "https://unstop.com/o/4Qfa2F9?lb=VpYCae40&utm_medium=Share&utm_source=shortUrl",
      date: "March 21-23, 2025",
      timing: "9 AM - 6 PM",
      venue: "TBA",
      description:
        "Breach 2025 is an exhilarating 3-day coding event based on the theme- 'Driving innovation in financial technology.' Participants will brainstorm, design and develop tools to provide solutions for pre-defined problem statements in the field of digital transactions, personal finance, investment & loans and other financial products.",
      type: "Hackathon"
    },
    {
      id: 2,
      img: "/images/logos/logo.webp",
      title: "Mock RBI",
      registrationLink: "#",
      date: "March 22, 2025",
      timing: "4 PM - 6 PM",
      venue: "TBA",
      description:
        "Mock RBI is Anirveda's flagship event that simulates the working of the Reserve Bank of India. Participants will make crucial saving or investing decisions and draft monetary policies while navigating through challenges to ensure economic stability and financial regulation.",
      type: "Simulation"
    },
    {
      id: 4,
      img: "/images/logos/logo.webp",
      title: "Speaker Session",
      registrationLink: "https://docs.google.com/forms/d/1qmwO1sETLGyDnkCt15wHWAb-J74KSHvy8mhs3_WBNPM/viewform",
      date: "March 23, 2025",
      timing: "2 PM - 5 PM",
      venue: "TBA",
      description:
        "An enlightening session featuring a prominent industrialist and visionary leader. Gain firsthand insights into industry trends, leadership strategies, and career advancement from the expert himself/herself!",
      type: "Workshop"
    },
    {
      id: 5,
      img: "/images/logos/logo.webp",
      title: "Space Odyssey",
      registrationLink: "#",
      date: "March 21-23, 2025",
      timing: "9 AM - 6 PM",
      venue: "TBA",
      description:
        "A life-sized, monopoly-inspired event where participants navigate a game board, each assigned an equal base budget & profession from a randomized deck of cards. Every dice roll determines their next move, unveiling new challenges & scenarios.",
      type: "Game"
    },
    {
      id: 6,
      img: "/images/logos/logo.webp",
      title: "Parallel Paradigm",
      registrationLink: "#",
      date: "March 21, 2025",
      timing: "4 PM - 6 PM",
      venue: "TBA",
      description: "Anirveda X Mind Ripple - A collaborative event exploring parallel thinking and innovative paradigms.",
      type: "Collaboration"
    },
    {
      id: 7,
      img: "/images/logos/logo.webp",
      title: "GalaxEcon",
      registrationLink: "#",
      date: "March 22, 2025",
      timing: "10 AM - 2 PM",
      venue: "TBA",
      description: "Anirveda X Bramhand - An interstellar economics challenge that combines space exploration with financial strategy.",
      type: "Competition"
    }
  ];

  return (
    <section className="py-20 px-4 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Mark your calendar for these exciting events and join us in creating memorable experiences
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-400 transform md:-translate-x-0.5 rounded-full"></div>

          {/* Events */}
          <div className="space-y-16">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="absolute left-8 md:left-1/2 w-6 h-6 bg-black border-4 border-amber-600 rounded-full transform -translate-x-3 md:-translate-x-3 z-20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full bg-amber-600 rounded-full"
                  />
                </motion.div>

                {/* Event Card */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(245, 158, 11, 0.15)",
                    y: -8
                  }}
                  className={`bg-gradient-to-br bg-tertiary rounded-3xl shadow-2xl ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                  } relative border border-amber-600/30 backdrop-blur-sm overflow-hidden group`}
                >
                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Arrow pointing to timeline */}
                  <div className={`absolute top-8 w-0 h-0 ${
                    index % 2 === 0
                      ? 'md:right-[-12px] border-l-12 border-l-gray-900'
                      : 'md:left-[-12px] border-r-12 border-r-gray-900'
                  } border-t-12 border-b-12 border-t-transparent border-b-transparent hidden md:block z-10`}></div>

                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-3xl">
                    <motion.img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Event Type Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.2 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="absolute top-4 left-4"
                    >
                      <span className="text-xs text-black font-bold px-3 py-1.5 bg-amber-600 rounded-full shadow-lg">
                        {event.type}
                      </span>
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="text-2xl font-bold text-primary mb-3 group-hover:text-amber-50 transition-colors"
                    >
                      {event.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="text-secondary mb-6 line-clamp-3 leading-relaxed"
                    >
                      {event.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                      className="space-y-3 mb-6"
                    >
                      <div className="flex items-center gap-3 text-sm text-primary">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-primary">
                        <Clock className="w-4 h-4 text-secondary" />
                        <span>{event.timing}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-primary">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span>{event.venue}</span>
                      </div>
                    </motion.div>

                    <motion.a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.2 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black px-6 py-3 rounded-full font-bold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-600/25"
                    >
                      Register Now 
                      <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsTimeline;