"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollController } from "@/lib/scrollStore";

// Register GSAP ScrollTrigger plugin safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Initializes Lenis smooth scrolling and synchronizes it with GSAP ScrollTrigger.
 * Drives the central scrollController progress stream that governs 3D cube state.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Initialize Lenis with smooth exponential damping
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.4 : 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll events with ScrollTrigger
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
    });

    // Hook Lenis into GSAP's optimized internal ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Create the master ScrollTrigger timeline spanning the entire page sequence
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        // Send normalized scroll progress (0.0 to 1.0) and scroll velocity
        scrollController.setProgress(self.progress, self.getVelocity());
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} id="vanta-scroll-container" className="relative w-full">
      {children}
    </div>
  );
}
