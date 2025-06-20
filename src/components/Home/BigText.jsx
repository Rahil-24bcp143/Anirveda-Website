import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "../../style.css";

gsap.registerPlugin(ScrollTrigger);

export default function BigText() {
  const getWindowWidth = () => window.innerWidth;
  const [width, setWidth] = useState(getWindowWidth());

  useEffect(() => {
    const onResize = () => setWidth(getWindowWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Adjust translateX on small screens
  const translateX = width > 1300 ? 0 : -200;

  // Refs for SVG text and container
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    // For <text>, use getComputedTextLength instead of getTotalLength
    const length = textEl.getComputedTextLength();

    gsap.set(textEl, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fill: "transparent",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 30%",
        scrub: true,
      },
    });

    tl.to(textEl, {
      strokeDashoffset: 0,
      ease: "power1.out",
    })
      .to(
        textEl,
        { fill: "currentColor", ease: "none" },
        "<"
      )
      .to(
        containerRef.current,
        { x: translateX, ease: "none" },
        "<"
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [translateX]);

  return (
    <div className="overflow-hidden text-secondary-15" ref={containerRef}>
      <svg
        className="bigText w-full"
        viewBox="0 0 800 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Yeseva"
          fontSize="140"
          strokeWidth="2"
          stroke="currentColor"
          ref={textRef}
        >
          Anirveda
        </text>
      </svg>
    </div>
  );
}
