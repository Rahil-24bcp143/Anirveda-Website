import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      text: "I had the opportunity of speaking at a session during Economania 2022 hosted by Anirveda PDEU. It was really a very good experience. They treated me with so much warmth and love. I was accompanied by my grandfather, and he was really proud to see me speak on the stage, address all the kids, and inspire them to do something different. I still remember the charm in his eyes when I was speaking. Team Anirveda did a great job at managing the event, and I think they should organize such events more often to inspire the students of the college.",
      name: "Soham Payal Pathak",
      designation: "Co-Founder (The Simply Salad)",
      fame: "Shark Tank India - Funded by Aman Gupta and Vineeta Singh",
      profilePicture: "images/testimonials/soham.png",
      linkedIn: "https://www.linkedin.com/in/soham-payal-pathak/",
      twitter: "",
    },
    {
      id: 2,
      text: "Being a part of Anirveda, the tech-economics club of my college, has been an incredible journey of growth and learning over the past four years. Starting as an associate and progressing to the role of Chief Coordinator, I had the opportunity to develop my leadership and people management skills in ways I never imagined. The club has been instrumental in broadening my understanding of the dynamic interplay between technology and economics. It challenged me to think critically, collaborate effectively, and innovate consistently. Anirveda was more than just a club—it was a platform for personal and professional growth. I will always cherish the experiences and the friendships I built here. I am grateful for this journey, which has equipped me with skills and knowledge that will stay with me for a lifetime.",
      name: "Hrishikesh Kalola",
      designation: "AI Engineer - Paperchase",
      profilePicture: "/images/testimonials/hrishikesh.webp",
      linkedIn: "https://www.linkedin.com/in/hrishk/",
      twitter: "https://twitter.com/hrishikeshkalola",
    },
    {
      id: 3,
      text: "Anirveda is one of the places where I truly connected with people and realized how such a niche intersection holds so much knowledge. It is truly one of the best places to explore the worlds of economics and technology, which couldn’t have been more well-integrated anywhere else.",
      name: "Tanish Patel",
      designation: "AI Engineer - Paperchase",
      profilePicture: "/images/testimonials/Tanish.webp",
      linkedIn: "https://www.linkedin.com/in/tanishpatel01/",
      twitter: "https://twitter.com/tanishpatel",
    },
    {
      id: 4,
      text: "Anirveda has been more than just a club for me; it has been a transformative journey of growth and self-discovery. From starting as a subcommittee member in the Documentation Department to serving as President, every role taught me invaluable lessons in leadership, teamwork, and resilience. The club’s nurturing environment allowed me to break out of my shell, evolve socially, and embrace new challenges with confidence. Passing on the baton to the next generation was bittersweet, but seeing them carry forward the legacy with passion reassuring me of Anirveda's bright future. Forever grateful to the club that shaped me in ways beyond words.",
      name: "Harshvardhan Gaikwad",
      designation: "Reliance Industries Ltd.",
      profilePicture: "images/testimonials/harshvardhan.png",
      linkedIn: "https://www.linkedin.com/in/harshvardhan-gaikwad-8471971bb/",
      twitter: "https://x.com/whatdharsh",
    },
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Framer Motion variants for the animation
  const cardVariants = {
    initial: { opacity: 0, y: 20 }, // Starts slightly below and invisible
    animate: { opacity: 1, y: 0 },  // Fades in and slides up to original position
    exit: { opacity: 0, y: -20 },   // Fades out and slides up when leaving
  };

  return (
    <div className="mt-14 pb-8">
      <h1 className="text-center font-Abel text-3xl font-medium text-primary lg:text-4xl">
        What people have to say about us
      </h1>
      <div className="mt-8 flex flex-col items-center justify-center"> {/* Added justify-center */}
        <AnimatePresence mode="wait"> {/* Use AnimatePresence for exit animations */}
          <motion.div
            key={testimonials[current].id} // Crucial for unique key, triggers re-render and animation
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
            className="relative w-full max-w-2xl min-h-[400px] rounded-2xl bg-tertiary py-8 px-8 shadow-lg xs:w-4/5 sm:w-[65%] xl:px-11 flex flex-col justify-between" // Added max-w-2xl and min-h-[400px], flex-col justify-between for content distribution
          >
            <div> {/* Wrapper for text and profile for better layout control */}
              <p className="text-justify font-Lato text-lg text-secondary">
                "{testimonials[current].text}"
              </p>
              <div className="mt-6 flex items-center justify-start gap-6"> {/* Changed justify-left to justify-start */}
                <img
                  src={testimonials[current].profilePicture}
                  alt={testimonials[current].name}
                  className="h-20 w-20 rounded-full object-cover shadow-lg"
                />
                <div className="text-left">
                  <h2 className="font-Lato text-xl font-semibold text-primary">{testimonials[current].name}</h2>
                  <p className="text-sm font-Lato text-secondary">{testimonials[current].designation}</p>
                  {testimonials[current].fame && ( // Conditionally render fame
                    <p className="text-sm font-Lato text-secondary">{testimonials[current].fame}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-start gap-4"> {/* Changed justify-center to justify-start */}
              {testimonials[current].linkedIn && (
                <a
                  href={testimonials[current].linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-3xl border border-primary px-7 pt-1 pb-[6px] text-lg text-primary hover:bg-primary hover:text-white hover:duration-300 flex items-center justify-center" // Added flex for icon centering
                >
                  <Icon icon="mdi:linkedin" className="text-xl" />
                </a>
              )}
              {testimonials[current].twitter && (
                <a
                  href={testimonials[current].twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-3xl border border-primary px-7 pt-1 pb-[6px] text-lg text-primary hover:bg-primary hover:text-white hover:duration-300 flex items-center justify-center" // Added flex for icon centering
                >
                  <Icon icon="mdi:twitter" className="text-xl" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex gap-4">
          <button
            onClick={handlePrev}
            className="cursor-pointer rounded-full bg-secondary-15 p-3 text-2xl text-primary hover:bg-primary hover:text-white"
          >
            <Icon icon="ic:baseline-chevron-left" />
          </button>
          <button
            onClick={handleNext}
            className="cursor-pointer rounded-full bg-secondary-15 p-3 text-2xl text-primary hover:bg-primary hover:text-white"
          >
            <Icon icon="ic:baseline-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}