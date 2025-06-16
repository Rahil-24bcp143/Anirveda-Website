import { useState, useEffect, useRef } from 'react';
import { useSprings, animated } from '@react-spring/web';

export const BlurText = ({ text, delay = 200, className = '' }) => {
  const words = text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current); // Unobserve after triggering the animation
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const springs = useSprings(
    words.length,
    words.map((_, i) => ({
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
        <animated.span key={index} style={props} className="inline-block will-change-transform">
          {words[index]}&nbsp;
        </animated.span>
      ))}
    </p>
  );
};

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen bg-black overflow-hidden relative">
      <BlurText text="ANIRVEDA" delay={200} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-amber-500 font-bold" />
      <div className="absolute inset-0 pointer-events-none">
        <RandomShapes />
      </div>
    </div>
  );
}

const RandomShapes = () => {
  const shapes = ['O'];
  const [shapeStyles, setShapeStyles] = useState(generateRandomShapes(10));

  useEffect(() => {
    const interval = setInterval(() => {
      setShapeStyles(generateRandomShapes(10));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {shapeStyles.map((style, index) => (
        <span
          key={index}
          className="absolute text-2xl text-amber-500 animate-[moveShapes_10s_linear_infinite]"
          style={style}
        >
          {shapes[Math.floor(Math.random() * shapes.length)]}
        </span>
      ))}
    </div>
  );
};

const generateRandomShapes = (numShapes) => {
  const randomShapes = [];
  for (let i = 0; i < numShapes; i++) {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomRotation = Math.random() * 360;
    const randomScale = Math.random() * (1.5 - 0.5) + 0.5;
    const randomOpacity = Math.random() * (0.8 - 0.3) + 0.3;
    randomShapes.push({
      top: `${randomY}vh`,
      left: `${randomX}vw`,
      transform: `rotate(${randomRotation}deg) scale(${randomScale})`,
      opacity: randomOpacity,
    });
  }
  return randomShapes;
};