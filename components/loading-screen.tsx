"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [hexDigits, setHexDigits] = useState(["0", "0", "0", "0", "0"]);
  const [isComplete, setIsComplete] = useState(false);
  const [showOne, setShowOne] = useState(false);
  const lockedDigitsRef = useRef(0); // Use ref to avoid re-render loops

  const loadingDuration = 3500; // 3.5 seconds

  useEffect(() => {
    let startTime: number | null = null;
    
    // Progress bar animation with easing that slows down dramatically at the end
    const animateProgress = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / loadingDuration, 1);
      
      // Custom easing: slow down dramatically in the last 10%
      let easedProgress;
      if (rawProgress < 0.9) {
        // Normal speed for first 90%
        easedProgress = rawProgress;
      } else {
        // Slow down dramatically for last 10%
        const lastPhase = (rawProgress - 0.9) / 0.1; // 0 to 1 in the last phase
        const slowedPhase = Math.pow(lastPhase, 3); // Cubic easing for dramatic slowdown
        easedProgress = 0.9 + (slowedPhase * 0.1);
      }
      
      setProgress(easedProgress * 100);
      
      if (rawProgress < 1) {
        requestAnimationFrame(animateProgress);
      }
    };
    
    requestAnimationFrame(animateProgress);

    // Progressive digit locking based on time
    // Lock first digit at 25%, second at 50%, third at 75%, fourth at 95% (more dramatic)
    const lockTimings = [
      { time: loadingDuration * 0.25, digitIndex: 0 },
      { time: loadingDuration * 0.50, digitIndex: 1 },
      { time: loadingDuration * 0.75, digitIndex: 2 },
      { time: loadingDuration * 0.95, digitIndex: 3 }, // Changed from 0.90 to 0.95 for more drama
    ];

    const lockTimeouts = lockTimings.map(({ time, digitIndex }) =>
      setTimeout(() => {
        lockedDigitsRef.current = digitIndex + 1;
      }, time)
    );

    // Glitching hexadecimal digits (1-F) for unlocked digits
    const glitchInterval = setInterval(() => {
      setHexDigits((prev) =>
        prev.map((_, index) => {
          // If this digit is locked, keep it as "0"
          if (index < lockedDigitsRef.current) {
            return "0";
          }
          // Last digit stays random until the very end
          const randomNum = Math.floor(Math.random() * 15) + 1; // 1-15
          return randomNum.toString(16).toUpperCase(); // Convert to hex (1-F)
        })
      );
    }, 80); // Fast glitch effect

    // Complete loading sequence
    const completeTimeout = setTimeout(() => {
      clearInterval(glitchInterval);
      setHexDigits(["0", "0", "0", "0", "1"]); // Set to 00001
      setIsComplete(true);
      setShowOne(true);
      
      // Pause for 0.5s then reveal content
      setTimeout(() => {
      onLoadingComplete();
      }, 750);
    }, loadingDuration);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(completeTimeout);
      lockTimeouts.forEach(clearTimeout);
    };
  }, [onLoadingComplete, loadingDuration]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Hexadecimal counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-1"
        >
          <span className="text-6xl md:text-8xl font-mono font-bold text-black">
            0x
          </span>
          {true && (
            <div className="flex">
              {hexDigits.map((digit, index) => (
                <span
                  key={index}
                  className="text-6xl md:text-8xl font-mono font-bold text-neutral-800"
                >
                  {digit}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Loading text */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="text-sm md:text-base font-medium tracking-[0.3em] text-neutral-600 uppercase">
            {showOne ? "Initializing" : "Loading"}
          </span>
          {!showOne && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-neutral-200 border-t-neutral-800 rounded-full"
            />
          )}
        </motion.div> */}

        {/* Progress bar */}
        <div className="w-80 md:w-96">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative h-1 bg-neutral-200 rounded-full overflow-hidden"
          >
            {/* Progress fill */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 bg-black rounded-full"
            />
          </motion.div>

    
        </div>
      </div>

    </motion.div>
  );
}
