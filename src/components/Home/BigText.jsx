import React, { useState, useEffect, useRef } from "react";
import { TextHoverEffect } from "../ui/text-hover-effect";
import "../../style.css";

export default function BigText() {
  const getWindowWidth = () => window.innerWidth;
  const [width, setWidth] = useState(getWindowWidth());
  const containerRef = useRef(null);

  useEffect(() => {
    const onResize = () => setWidth(getWindowWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="overflow-hidden text-secondary-15" ref={containerRef}>
      <TextHoverEffect text="Anirveda" duration={0.3} />
    </div>
  );
}
