import React, { useState, useEffect } from "react";

const TypingText = ({
  text = "Empowering Innovation and Growth",
  className = "",
  typingSpeed="120",
  delay="800"
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting]   = useState(false);
  const [charIndex, setCharIndex]     = useState(0);
  const [isCursorBlinking, setCursor] = useState(true);

 
  const typeSpeed         = typingSpeed;   // ms per character when typing
  const deletingSpeed       = 60;    // ms per character when deleting
  const initialPause        = 1000;  // wait before blink at end of typing
  const blinkDuration       = 600;   // full blink cycle (on+off)
  const numberOfBlinks      = 2;     // how many on/off cycles
  const delayBeforeDeleting = delay;   // wait after blinking before deleting
  const pauseAfterDeleting  = 900;   // wait after fully deleted before re‑typing

  useEffect(() => {
    let timer;
    let blinkTimer;

    const runAnimation = () => {
      if (!isDeleting) {
        
        if (charIndex < text.length) {
          timer = setTimeout(() => {
            setDisplayedText(text.slice(0, charIndex + 1));
            setCharIndex(idx => idx + 1);
          }, typingSpeed);
        } else {
          
          let blinkCount = 0;
          setCursor(true);

          blinkTimer = setInterval(() => {
            if (blinkCount < numberOfBlinks * 2) {
              setCursor(prev => !prev);
              blinkCount++;
            } else {
              clearInterval(blinkTimer);
              setCursor(false);
              timer = setTimeout(() => setIsDeleting(true), delayBeforeDeleting);
            }
          }, blinkDuration / 2);
        }
      } else {
        // — DELETING PHASE —
        if (charIndex > 0) {
          timer = setTimeout(() => {
            setDisplayedText(text.slice(0, charIndex - 1));
            setCharIndex(idx => idx - 1);
          }, deletingSpeed);
        } else {
          // fully deleted → reset for next loop
          timer = setTimeout(() => {
            setIsDeleting(false);
            setCharIndex(0);
            setCursor(true);
          }, pauseAfterDeleting);
        }
      }
    };

    runAnimation();

    return () => {
      clearTimeout(timer);
      clearInterval(blinkTimer);
    };
  }, [charIndex, isDeleting, text]);

  return (
    <span className={className}>
      {displayedText}
      <span className={isCursorBlinking ? "inline" : "invisible"}>|</span>
    </span>
  );
};

export default TypingText;