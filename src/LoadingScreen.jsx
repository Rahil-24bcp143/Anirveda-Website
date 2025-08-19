import React,  { useState, useEffect, useRef, useCallback } from 'react';
import { useSprings, animated } from '@react-spring/web';

// BlurText component for the animated text
export const BlurText = ({ text, delay = 200, className = '' }) => {
  const characters = text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  const springs = useSprings(
    characters.length,
    characters.map((_, i) => ({
      from: { filter: 'blur(50px)', opacity: 0, transform: 'translate3d(0,-50px,0)' },
      to: inView
        ? async (next) => {
            await next({ filter: 'blur(5px)', opacity: 0.5, transform: 'translate3d(0,5px,0)' });
            await next({ filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' });
          }
        : { filter: 'blur(10px)', opacity: 0 },
      delay: i * delay,
    }))
  );

  return (
    <p ref={ref} className={`${className} relative uppercase tracking-tight`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={props}
          className="inline-block will-change-transform"
        >
          {/* FIX: Conditionally render a non-breaking space for actual space characters */}
          {characters[index] === ' ' ? '\u00A0' : characters[index]}
        </animated.span>
      ))}
    </p>
  );
};

// BackgroundTermsAnimation component for the dynamic background terms (unchanged)
const BackgroundTermsAnimation = ({ termsArray }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particles = useRef([]);

  const PARTICLE_COUNT = 40; // Sparser: Reduced number of particles
  const PARTICLE_SPEED_VARIATION = 0.3; // Base speed variation for random movement
  const GLITCH_PROBABILITY = 0.0005; // Less frequent glitches
  const GLITCH_DURATION_FRAMES = 10; // Glitch duration
  const PARTICLE_LIFESPAN = 300; // Frames a particle lives (approx 5 seconds at 60fps)

  // Helper function to create a new particle
  const createParticle = useCallback((canvasWidth, canvasHeight) => {
    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      // Random direction and speed for movement
      vx: (Math.random() - 0.5) * PARTICLE_SPEED_VARIATION * 2,
      vy: (Math.random() - 0.5) * PARTICLE_SPEED_VARIATION * 2,
      value: termsArray[Math.floor(Math.random() * termsArray.length)], // Random term
      life: PARTICLE_LIFESPAN, // Start with full life
      glitchTimer: 0,
      initialOpacity: Math.random() * 0.05 + 0.005, // Very low base opacity
      targetOpacity: Math.random() * 0.15 + 0.05, // Slightly higher peak for readability
    };
  }, [termsArray]);

  // Function to initialize all particles
  const initializeParticles = useCallback((canvasWidth, canvasHeight) => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvasWidth, canvasHeight)
    );
  }, [createParticle]);

  // Function to update particle states
  const updateParticles = useCallback((canvasWidth, canvasHeight) => {
    particles.current.forEach((p, index) => {
      if (p.glitchTimer > 0) {
        // Glitch effect
        p.value = termsArray[Math.floor(Math.random() * termsArray.length)]; // Rapidly change term
        p.x += (Math.random() - 0.5) * 5; // Jitter position
        p.y += (Math.random() - 0.5) * 5;
        p.opacity = Math.random() * 0.3; // Flicker opacity
        p.glitchTimer--;
      } else {
        // Normal movement
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        // Opacity lifecycle: fade in, stay, fade out
        if (p.life > PARTICLE_LIFESPAN * 0.8) { // Fade in during first 20% of life
            p.opacity = p.initialOpacity + (p.targetOpacity - p.initialOpacity) * (1 - p.life / (PARTICLE_LIFESPAN * 0.2));
        } else if (p.life < PARTICLE_LIFESPAN * 0.2) { // Fade out during last 20% of life
            p.opacity = p.targetOpacity * (p.life / (PARTICLE_LIFESPAN * 0.2));
        } else { // Steady opacity in between
            p.opacity = p.targetOpacity;
        }

        // Keep opacity within bounds
        p.opacity = Math.max(0, Math.min(0.2, p.opacity)); // Overall max opacity of 0.2

        // Trigger glitch randomly
        if (Math.random() < GLITCH_PROBABILITY) {
          p.glitchTimer = GLITCH_DURATION_FRAMES;
        }
      }

      // If particle dies or moves off-screen, re-initialize it
      if (p.life <= 0 || p.x < -100 || p.x > canvasWidth + 100 || p.y < -50 || p.y > canvasHeight + 50) {
        particles.current[index] = createParticle(canvasWidth, canvasHeight);
      }
    });
  }, [termsArray, createParticle]);

  // Function to draw particles on the canvas
  const drawParticles = useCallback((ctx, canvasWidth, canvasHeight) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas

    const baseFontSize = Math.min(canvasWidth, canvasHeight) * 0.03; // Responsive font size

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    particles.current.forEach(p => {
      // Slight font size variation
      ctx.font = `${baseFontSize * (1 + (Math.random() - 0.5) * 0.05)}px 'Inter', monospace`;
      ctx.fillStyle = `rgba(201, 135, 43, ${p.opacity})`; // Amber color with dynamic opacity
      ctx.fillText(p.value, p.x, p.y);
    });
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    updateParticles(rect.width, rect.height);
    drawParticles(ctx, rect.width, rect.height);

    animationFrameId.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      initializeParticles(rect.width, rect.height);
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawParticles(ctx, rect.width, rect.height);
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Initial setup
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, initializeParticles, drawParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      aria-hidden="true"
    />
  );
};

// New GeometricMatrixLoader component (unchanged)
const GeometricMatrixLoader = () => {
  const amberColor = 'rgb(201, 135, 43)'; // The primary amber color
  const darkAmberShadow = 'rgba(201, 135, 43, 0.7)'; // For shadows, slightly transparent
  // Removed lighterAmberShadow as it was unused and replaced with direct color where needed
  // Removed verySubtleAmber and dataActivityAmber, subtleNodeAmber as they are not used directly as variables

  return (
    <div className="loading-container relative mt-8"> {/* Added mt-8 for spacing */}
      {/* Central Hexagon - Data Vault / Secure Core */}
      <div
        className="central-hexagon"
        style={{
          borderColor: amberColor,
          boxShadow: `0 0 20px ${darkAmberShadow}`,
        }}
      ></div>

      {/* Inner Dot - Active Core */}
      <div
        className="inner-dot-v2"
        style={{
          backgroundColor: amberColor, // Changed to amber
          boxShadow: `0 0 10px ${amberColor}, 0 0 20px ${darkAmberShadow}`, // Amber shadows
        }}
      ></div>

      {/* Cascading Data Lines (Square-like movement) */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="data-cascade"
          style={{
            backgroundColor: amberColor, // Amber for data activity
            boxShadow: `0 0 8px ${amberColor}`,
            animationDelay: `${i * 0.5}s`, // Staggered delays
          }}
        ></div>
      ))}

      {/* Outer Layer of Connecting Nodes */}
      {[...Array(5)].map((_, i) => {
        const positions = [
          { top: '10%', left: '20%' },
          { top: '80%', left: '70%' },
          { top: '30%', left: '80%' },
          { top: '60%', left: '10%' },
          { top: '5%', left: '50%' },
        ];
        return (
          <div
            key={i}
            className="connecting-node"
            style={{
              backgroundColor: 'rgba(201, 135, 43, 0.4)', // Amber with transparency
              ...positions[i],
              animationDelay: `${i * 0.5}s`, // Staggered delays
            }}
          ></div>
        );
      })}
    </div>
  );
};

// GameLoadingStatus component for bottom-right percentage (unchanged)
const GameLoadingStatus = ({ duration = 7000, onAnimationComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrameId;

    const animateProgress = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const currentProgress = Math.min(100, (elapsedTime / duration) * 100);

      setProgress(Math.floor(currentProgress));

      if (currentProgress < 100) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Animation is complete
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration, onAnimationComplete]);

  return (
    <div className="absolute bottom-4 right-4 z-20">
      <span className="text-amber-500 font-mono text-4xl md:text-5xl lg:text-6xl font-bold">{progress}%</span>
    </div>
  );
};

// Main LoadingScreen component
export default function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const transitionOutDuration = 1000; // Duration for the fade-out transition

  // Customizable array of techno-economic terms for the background
  const technoEconomicTerms = [
    "BLOCKCHAIN", "BITCOIN", "ETHEREUM", "AI", "ML",
    "DEFI", "NFT", "SMART CONTRACT", "LIQUIDITY",
    "GDP", "INFLATION", "REPO RATE", "FIAT", "FINTECH",
    "QUANTUM", "ALGORITHM", "CYBER", "METAVERSE", "WEB3",
    "SUPPLY CHAIN", "LOGISTICS", "MARKET CAP", "VOLATILITY"
  ];

  // Simulate content loading
  useEffect(() => {
    const contentDelay = 5000; // Simulate 5 seconds for content to load
    const timer = setTimeout(() => {
      setContentReady(true);
    }, contentDelay);
    return () => clearTimeout(timer);
  }, []);

  // Handle animation completion from GameLoadingStatus
  const handleAnimationComplete = useCallback(() => {
    setAnimationDone(true);
  }, []);

  // Decide whether to show the loading screen or the main content
  useEffect(() => {
    if (contentReady && animationDone) {
      // Trigger fade-out animation first
      const timer = setTimeout(() => {
        setShowLoadingScreen(false); // Then unmount after fade-out completes
      }, transitionOutDuration);
      return () => clearTimeout(timer);
    }
  }, [contentReady, animationDone, transitionOutDuration]);


  return (
    <>
      {/* Tailwind CSS CDN for utility classes */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter (for text) and Share Tech Mono (for digital feel in background terms) */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      <style>
        {`
          /* Apply Inter font family as default */
          body {
            font-family: 'Inter', sans-serif;
            background-color: #000000; /* Ensure black background */
          }
          /* Ensure html, body, #root take full height and width */
          html, body, #root {
              height: 100%;
              width: 100%;
              margin: 0;
              padding: 0;
              overflow: hidden; /* Prevent body scroll */
          }

          /* General loading container for the geometric loader */
          .loading-container {
            width: 150px; /* Reduced base size */
            height: 150px; /* Reduced base size */
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            transform-style: preserve-3d;
          }

          /* Central Hexagon - Data Vault / Secure Core */
          .central-hexagon {
              position: absolute;
              width: 70px; /* Adjusted size */
              height: 70px; /* Adjusted size */
              background-color: transparent;
              clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
              animation: hexagon-pulse 2s ease-in-out infinite alternate, rotate-slow 15s linear infinite;
          }

          @keyframes hexagon-pulse {
              0% { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 15px rgba(201, 135, 43, 0.7); }
              50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 30px rgba(201, 135, 43, 1); }
              100% { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 15px rgba(201, 135, 43, 0.7); }
          }

          @keyframes rotate-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
          }

          /* Inner Dot - Active Core */
          .inner-dot-v2 {
              position: absolute;
              width: 8px; /* Adjusted size */
              height: 8px; /* Adjusted size */
              border-radius: 50%;
              animation: pulse-dot 1.5s ease-in-out infinite alternate;
          }

          @keyframes pulse-dot {
              0% { transform: scale(0.7); opacity: 0.7; }
              50% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(0.7); opacity: 0.7; }
          }

          /* Cascading Data Lines (Square-like movement) */
          .data-cascade {
              position: absolute;
              width: 3px; /* Adjusted size */
              height: 3px; /* Adjusted size */
              opacity: 0;
              animation: cascade-flow 3s linear infinite;
              transform-origin: center center;
              border-radius: 1px; /* Slightly rounded square */
          }

          @keyframes cascade-flow {
              0% { opacity: 0; transform: translate(0, 0); }
              10% { opacity: 1; }
              25% { transform: translate(40px, 0); } /* Adjusted translation */
              50% { transform: translate(40px, 40px); } /* Adjusted translation */
              75% { transform: translate(0, 40px); } /* Adjusted translation */
              90% { opacity: 1; }
              100% { opacity: 0; transform: translate(0, 0); }
          }

          /* Outer Layer of Connecting Nodes */
          .connecting-node {
              position: absolute;
              width: 5px; /* Adjusted size */
              height: 5px; /* Adjusted size */
              border-radius: 50%;
              opacity: 0;
              animation: node-connect 4s ease-in-out infinite;
          }

          @keyframes node-connect {
              0% { opacity: 0; transform: scale(0.5); }
              25% { opacity: 1; transform: scale(1); }
              75% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(0.5); }
          }

          /* Responsive adjustments for loading-container and its children */
          @media (max-width: 768px) { /* Medium screens and smaller */
            .loading-container {
              width: 120px;
              height: 120px;
            }
            .central-hexagon {
              width: 50px;
              height: 50px;
              border-width: 1.5px;
            }
            .inner-dot-v2 {
              width: 6px;
              height: 6px;
            }
            .data-cascade {
              width: 2.5px;
              height: 2.5px;
            }
            @keyframes cascade-flow {
              0% { opacity: 0; transform: translate(0, 0); }
              10% { opacity: 1; }
              25% { transform: translate(30px, 0); }
              50% { transform: translate(30px, 30px); }
              75% { transform: translate(0, 30px); }
              90% { opacity: 1; }
              100% { opacity: 0; transform: translate(0, 0); }
            }
            .connecting-node {
              width: 4px;
              height: 4px;
            }
          }

          @media (max-width: 640px) { /* Small screens (mobile) and smaller */
            .loading-container {
              width: 100px;
              height: 100px;
            }
            .central-hexagon {
              width: 40px;
              height: 40px;
              border-width: 1px;
            }
            .inner-dot-v2 {
              width: 5px;
              height: 5px;
            }
            .data-cascade {
              width: 2px;
              height: 2px;
            }
            @keyframes cascade-flow {
              0% { opacity: 0; transform: translate(0, 0); }
              10% { opacity: 1; }
              25% { transform: translate(25px, 0); }
              50% { transform: translate(25px, 25px); }
              75% { transform: translate(0, 25px); }
              90% { opacity: 1; }
              100% { opacity: 0; transform: translate(0, 0); }
            }
            .connecting-node {
              width: 3px;
              height: 3px;
            }
          }
        `}
      </style>
      {/* Overall container for the entire screen, encompassing all loading elements */}
      {showLoadingScreen && (
        <div className={`absolute inset-0 bg-black overflow-hidden flex justify-center items-center transition-opacity duration-${transitionOutDuration}`}>
          {/* Full-screen background animation */}
          <BackgroundTermsAnimation termsArray={technoEconomicTerms} />

          {/* Central content container for ANIRVEDA, sub-text, and loader */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Main animated text */}
            <BlurText
              text="ANIRVEDA"
              delay={70} // Increased animation speed
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-amber-500 font-bold"
            />
            {/* Secondary text, smaller font, below the main text */}
            <BlurText
              text="The Techno-Economics club"
              delay={100} // Adjusted delay for secondary text
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-500 mt-4" // mt-4 for margin top
            />

            {/* New GeometricMatrixLoader component */}
            <GeometricMatrixLoader />
          </div>

          {/* Game-style loading percentage in bottom-right */}
          {/* <GameLoadingStatus duration={3900} onAnimationComplete={handleAnimationComplete} /> Pass callback */}

          {/* Visually hidden text for screen readers for accessibility */}
          <div role="status" aria-live="polite" className="sr-only">
            Loading. Please wait.
          </div>
        </div>
      )}
      {!showLoadingScreen && (
        // This is where your actual website content would go
        <div className="flex justify-center items-center h-screen w-screen bg-black text-white text-5xl">
          
        </div>
      )}
    </>
  );
}
