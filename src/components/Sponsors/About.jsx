import React, { useState, useEffect } from "react";

export default function Main() {
  const textToAnimate = "Empowering Innovation and Growth...";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isCursorBlinking, setIsCursorBlinking] = useState(true); // New state for cursor blink

  // Animation timing controls
  const typingSpeed = 120; // Speed of typing (ms per character)
  const deletingSpeed = 60; // Speed of deleting (ms per character)
  const initialPauseAfterTyping = 1000; // First part of the "double tap" pause
  const blinkDuration = 600; // Duration for one blink cycle (e.g., 200ms on, 200ms off, 200ms on)
  const numberOfBlinks = 2; // How many times the cursor should blink
  const delayBeforeDeleting = 800; // Second part of the "double tap" pause after blinks
  const pauseAfterDeleting = 900; // Pause after deleting all text

  useEffect(() => {
    let timer;
    let blinkTimer;

    const handleTypingEffect = () => {
      if (!isDeleting) {
        // --- TYPING PHASE ---
        if (charIndex < textToAnimate.length) {
          setIsCursorBlinking(true); // Cursor blinks while typing
          timer = setTimeout(() => {
            setDisplayedText(textToAnimate.substring(0, charIndex + 1));
            setCharIndex((prevIndex) => prevIndex + 1);
          }, typingSpeed);
        } else {
          // Text is fully typed. Start the specific blinking sequence.
          setIsCursorBlinking(true); // Ensure cursor is visible initially for blinking

          let blinkCount = 0;
          blinkTimer = setInterval(() => {
            if (blinkCount < numberOfBlinks * 2) { // x2 because it's a cycle of on/off
              setIsCursorBlinking((prev) => !prev);
              blinkCount++;
            } else {
              clearInterval(blinkTimer); // Stop blinking
              setIsCursorBlinking(false); // Ensure cursor is hidden after blinks
              
              // Now, after blinks are done, apply the total "double tap" delay before deleting
              timer = setTimeout(() => {
                setIsDeleting(true);
              }, delayBeforeDeleting);

            }
          }, blinkDuration / 2); // Divide by 2 because setInterval runs for each state change (on/off)

          // This outer setTimeout ensures there's an initial pause
          // before the specific blink sequence even starts.
          // This creates the first part of your "double tap" feel.
          timer = setTimeout(() => {
              // The `blinkTimer` takes over here.
          }, initialPauseAfterTyping);
        }
      } else {
        // --- DELETING PHASE ---
        setIsCursorBlinking(true); // Cursor can blink while deleting or stay static
        if (charIndex > 0) {
          timer = setTimeout(() => {
            setDisplayedText(textToAnimate.substring(0, charIndex - 1));
            setCharIndex((prevIndex) => prevIndex - 1);
          }, deletingSpeed);
        } else {
          // Text is fully deleted. Pause before starting to type again.
          timer = setTimeout(() => {
            setIsDeleting(false);
            setCharIndex(0);
            setDisplayedText(""); // Clear text for a clean re-type
            setIsCursorBlinking(true); // Ensure cursor is visible to start typing again
          }, pauseAfterDeleting);
        }
      }
    };

    handleTypingEffect();

    // Cleanup: Clear all timeouts and intervals to prevent memory leaks
    return () => {
      clearTimeout(timer);
      clearInterval(blinkTimer);
    };
  }, [
    charIndex,
    isDeleting,
    textToAnimate,
    typingSpeed,
    deletingSpeed,
    initialPauseAfterTyping,
    delayBeforeDeleting,
    pauseAfterDeleting,
    blinkDuration, // Added new dependencies
    numberOfBlinks, // Added new dependencies
  ]);

  return (
    <div className="mt-12 overflow-hidden px-3 btwnMdAndLg:mt-20 btwnMdAndLg:px-12 lg:px-16 xl:px-20 pb-28">
      <div className="text-center btwnMdAndLg:text-left">
        <h1
          className="font-Bebas text-[6rem] xs:text-9xl xl:text-[9rem] uppercase leading-[7rem] text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#b69575] drop-shadow-sm tracking-wide"
        >
          Sponsors
        </h1>
        <h2 className="-mt-2 font-Abel text-4xl text-secondary btwnMdAndLg:text-3xl xl:text-4xl">
          {displayedText}
          {/* Apply animate-blink class conditionally based on isCursorBlinking state */}
          <span className={`ml-1 text-secondary ${isCursorBlinking ? 'animate-blink' : 'opacity-0'}`}>|</span>
        </h2>
        <p className="mx-auto mt-5 w-11/12 text-justify font-Abel text-base text-secondary btwnMdAndLg:mx-0 btwnMdAndLg:text-xl xl:w-3/5 xl:text-2xl leading-relaxed tracking-wide">
          Anirveda is dedicated to fostering innovation, bridging technology and economics to create meaningful solutions.
          Our sponsors are integral to this journey, enabling us to host events, workshops, and projects that empower students to turn ideas into reality.
          <br /><br />
          We extend our heartfelt gratitude to our sponsors for their unwavering support in nurturing talent and driving forward our mission of learning, creativity, and real-world impact.
        </p>
      </div>

      <div className="flex justify-center space-x-4 py-10 btwnMdAndLg:block btwnMdAndLg:space-y-4">
        <a href="#pastsponsors">
          <button className="rounded-3xl border-2 border-primary bg-primary px-6 py-2 text-lg text-white transition-all duration-300 ease-in-out hover:bg-transparent hover:text-primary hover:shadow-md hover:scale-105">
            Past Sponsors
          </button>
        </a>
      </div>
    </div>
  );
}