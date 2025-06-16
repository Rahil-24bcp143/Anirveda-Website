import React, { useState, useEffect } from 'react';
import confetti from "canvas-confetti";

const REQUIRED_SCORE = 10;

const runConfetti = () => {
  confetti({
    particleCount: 200,
    spread: 120,
    startVelocity: 30,
    scalar: 1.2,
    origin: { x: 0.5, y: 0.5 },
  });
};

const TapGame = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem("bestScore")) || 0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameObjects, setGameObjects] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft((time) => (time <= 1 ? (setIsPlaying(false), 0) : time - 1));
    }, 1000);

    const coinInterval = setInterval(() => {
      if (Math.random() < 0.7) spawnObject('coin');
    }, 500);

    const bombInterval = setInterval(() => {
      if (Math.random() < 0.9) spawnObject('bomb');
    }, 300);

    return () => {
      clearInterval(timer);
      clearInterval(coinInterval);
      clearInterval(bombInterval);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (score >= REQUIRED_SCORE) {
        runConfetti();
        setShowRegistration(true);
      }
      setShowPopup(false);
      
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem("bestScore", score);
      }
    }
  }, [timeLeft, score, bestScore]);

  const spawnObject = (type) => {
    const id = Date.now() + Math.random();
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    
    setGameObjects((prev) => [...prev, { id, type, x, y }]);

    setTimeout(() => {
      setGameObjects((prev) => prev.filter((obj) => obj.id !== id));
    }, 2000);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    setGameObjects([]);
    setShowPopup(false);
    setShowRegistration(false);
    spawnObject('coin');
  };

  const handleTap = (type, id) => {
    if (!isPlaying) return;
    setGameObjects((prev) => prev.filter((obj) => obj.id !== id));
    if (type === 'coin') {
      setScore((prev) => prev + 1);
    } else {
      setIsPlaying(false);
      setTimeLeft(0); 
    }
  };
  

  return (
    <div className="max-w-lg mx-auto text-center p-4 relative">
      {/* Pop-up Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-tertiary text-primary p-6 rounded-lg shadow-lg w-96 text-center">
            {!showRegistration ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Welcome to the Challenge!</h2>
                <p className="mb-6">Choose an option to proceed:</p>
                <button onClick={startGame} className="w-full mb-4 px-6 py-2 bg-primary text-black rounded-md hover:bg-secondary transition">
                  🎮 Play the Game
                </button>
                <button onClick={() => setShowRegistration(true)} className="w-full px-6 py-2 border-2 border-primary rounded-md text-primary hover:bg-secondary hover:bg-opacity-20 transition">
                  🔗 Get Registration Link
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
                <p className="mb-4">Register now using any of these links:</p>
                <a href="https://unstop.com/o/4Qfa2F9?lb=VpYCae40&utm_medium=Share&utm_source=shortUrl" target="_blank" rel="noopener noreferrer" className="block mb-2 text-blue-400 underline">
                  BREACH 2025!
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="block mb-2 text-blue-400 underline">
                  MOCK RBI
                </a>
                <a href="https://docs.google.com/forms/d/1qmwO1sETLGyDnkCt15wHWAb-J74KSHvy8mhs3_WBNPM/viewform" target="_blank" rel="noopener noreferrer" className="block mb-2 text-blue-400 underline">
                  SPEAKER SESSION
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="block mb-2 text-blue-400 underline">
                  SPACE ODESSY
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="block mb-2 text-blue-400 underline">
                  ANIRVEDA X MIND RIPPLE
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="block mb-2 text-blue-400 underline">
                  ANIRVEDA X BRAMHAND
                </a>
                
                <button onClick={() => setShowPopup(false)} className="mt-4 px-6 py-2 bg-primary text-black rounded-md hover:bg-secondary transition">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

     
      <div className="bg-secondary bg-opacity-20 rounded-lg p-4 flex justify-around mb-4">
        <p className="text-primary text-xl font-bold">Score: {score}</p>
        <p className="text-primary text-xl font-bold">Best: {bestScore}</p>
        <p className="text-primary text-2xl font-bold">{timeLeft}s</p>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-96 bg-black border-2 border-primary rounded-lg overflow-hidden touch-none">
        {isPlaying && gameObjects.map((obj) => (
          <div
            key={obj.id}
            className={`absolute w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-full cursor-pointer transition-transform duration-100 ${obj.type === 'coin' ? 'bg-primary text-black' : 'bg-red-500 animate-pulse text-white'}`}
            style={{ left: `${obj.x}%`, top: `${obj.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => handleTap(obj.type, obj.id)}
          >
            {obj.type === 'coin' ? '₿' : '💣'}
          </div>
        ))}

        {/* End of Game Overlay */}
        {!isPlaying && !showPopup && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-primary p-8">
            <h2 className="text-2xl font-bold">{score >= REQUIRED_SCORE ? '🎉 You Win! 🎉' : 'Game Over!'}</h2>
            <p className="text-lg">Final Score: {score}</p>
            <p className="text-lg font-bold">Best Score: {bestScore}</p>
            <button onClick={startGame} className="mt-4 px-6 py-2 bg-primary text-black rounded-md hover:bg-secondary transition">
              🔄 Play Again
            </button>
            <button onClick={() => setShowPopup(true)} className="mt-2 px-6 py-2 border-2 border-primary rounded-md text-primary hover:bg-secondary hover:bg-opacity-20 transition">
              Back to Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TapGame;
