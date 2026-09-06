"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { scrollController } from "@/lib/scrollStore";

export function LoadingScreen() {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const minTime = 3000; // Let the wave play at least once
    const maxTime = 8000; // Fallback max time
    const start = Date.now();
    let timer: NodeJS.Timeout;

    const check = () => {
      if (isReady) return;
      const elapsed = Date.now() - start;
      
      if ((progress >= 100 && elapsed >= minTime) || elapsed >= maxTime) {
        setIsReady(true);
        // Trigger site loaded right as the curtain starts lifting up
        setTimeout(() => {
          scrollController.setLoaded(true);
        }, 300);
      } else {
        timer = setTimeout(check, 250);
      }
    };
    
    check();
    return () => clearTimeout(timer);
  }, [progress, isReady]);

  const text = "VANTACLIP";
  const letters = text.split("");

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1, y: "0%" }}
          exit={{ 
            y: "-100%", 
            opacity: 1,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-[#050508] flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="flex flex-row items-center justify-center w-full pb-20">
            {/* Left Spacer & Logo */}
            <div className="flex-1 flex justify-end pr-4 md:pr-6">
              <div className="overflow-hidden">
                <motion.img
                  src="/logo.png"
                  alt="Logo"
                  className="h-10 md:h-14 w-auto object-contain drop-shadow-lg"
                  initial={{ y: "150%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                />
              </div>
            </div>
            
            {/* Wavy Text (Perfectly Centered) */}
            <div className="flex overflow-hidden shrink-0">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-5xl lg:text-6xl text-white tracking-widest inline-block leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  initial={{ y: "150%" }}
                  animate={{ y: ["150%", "0%", "0%", "150%", "150%"] }}
                  transition={{ 
                    duration: 2.5, 
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                    repeat: Infinity,
                    delay: 0.5 + i * 0.06 
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Right Spacer for balance */}
            <div className="flex-1"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
