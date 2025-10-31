import React from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

export default function Testimonial() {
  const testimonials = [
    {
      quote: "I had the opportunity of speaking at a session during Economania 2022 hosted by Anirveda PDEU. It was really a very good experience. They treated me with so much warmth and love. I was accompanied by my grandfather, and he was really proud to see me speak on the stage, address all the kids, and inspire them to do something different.",
      name: "Soham Payal Pathak",
      designation: "Co-Founder (The Simply Salad) | Shark Tank India - Funded by Aman Gupta and Vineeta Singh",
      src: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756113541/soham_gx627v.png",
    },
    {
      quote: "Being a part of Anirveda, the tech-economics club of my college, has been an incredible journey of growth and learning over the past four years. Starting as an associate and progressing to the role of Chief Coordinator, I had the opportunity to develop my leadership and people management skills in ways I never imagined.",
      name: "Hrishikesh Kalola",
      designation: "AI Engineer - Paperchase",
      src: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756452188/HrishikeshBhai_aio2jr.jpg",
    },
    {
      quote: "Anirveda is one of the places where I truly connected with people and realized how such a niche intersection holds so much knowledge. It is truly one of the best places to explore the worlds of economics and technology, which couldn't have been more well-integrated anywhere else.",
      name: "Tanish Patel",
      designation: "AI Engineer - Paperchase",
      src: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756113541/Tanish_cmmgkr.webp",
    },
    {
      quote: "Anirveda has been more than just a club for me; it has been a transformative journey of growth and self-discovery. From starting as a subcommittee member in the Documentation Department to serving as President, every role taught me invaluable lessons in leadership, teamwork, and resilience.",
      name: "Harshvardhan Gaikwad",
      designation: "Reliance Industries Ltd.",
      src: "https://res.cloudinary.com/duygdcgj3/image/upload/v1756113538/harshvardhan_crwr17.png",
    },
  ];

  return (
    <div className="mt-14 pb-8">
      <h1 className="text-center font-Abel text-3xl font-medium text-primary lg:text-4xl mb-8">
        What people have to say about us
      </h1>
      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
    </div>
  );
}
