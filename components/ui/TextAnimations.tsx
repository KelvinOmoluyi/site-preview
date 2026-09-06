"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { scrollController } from "@/lib/scrollStore";

interface SectionAnimationContextValue {
  isTriggered: boolean;
}

const SectionAnimationContext = createContext<SectionAnimationContextValue | null>(null);

export function useSectionAnimation() {
  const context = useContext(SectionAnimationContext);
  return context;
}

/**
 * Wraps a section to synchronize its entrance animations with the loading screen
 * and the custom fullpage slide engine.
 */
export function AnimatedSection({
  index,
  id,
  className = "",
  children,
}: {
  index: number;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const checkTrigger = () => {
      // Must not trigger while loading screen is covering the page
      if (!scrollController.isSiteLoaded) {
        return;
      }
      // If user reaches this section, trigger entrance animation and keep it active
      if (scrollController.currentSection === index) {
        setIsTriggered(true);
      }
    };

    // Check immediately in case it's already loaded and active
    checkTrigger();

    window.addEventListener("vanta-site-loaded", checkTrigger);
    window.addEventListener("vanta-section-change", checkTrigger);

    return () => {
      window.removeEventListener("vanta-site-loaded", checkTrigger);
      window.removeEventListener("vanta-section-change", checkTrigger);
    };
  }, [index]);

  return (
    <SectionAnimationContext.Provider value={{ isTriggered }}>
      <section id={id} className={className}>
        {children}
      </section>
    </SectionAnimationContext.Provider>
  );
}

/**
 * Big headline wave animation:
 * Letters rise sequentially from a clipped container in a smooth staggered wave.
 * Once landed, letters remain crisply visible.
 */
export function WavyHeader({ 
  text, 
  className = "",
  delayOffset = 0,
  stagger = 0.035,
}: { 
  text: string; 
  className?: string;
  delayOffset?: number;
  stagger?: number;
}) {
  const context = useSectionAnimation();
  const isTriggered = context ? context.isTriggered : true;
  const letters = text.split("");
  
  return (
    <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
      {letters.map((letter, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
          <motion.span
            className="inline-block leading-none"
            style={{
              WebkitTextStroke: "inherit",
              WebkitTextFillColor: "inherit",
            }}
            initial={{ y: "135%", opacity: 0 }}
            animate={
              isTriggered 
                ? { y: "0%", opacity: 1 } 
                : { y: "135%", opacity: 0 }
            }
            transition={{ 
              duration: 0.85, 
              ease: [0.16, 1, 0.3, 1],
              delay: delayOffset + i * stagger,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Paragraph & subhead gathering animation:
 * Words rise upwards with blur and fade-in, with subsequent lines having slightly
 * longer durations so the paragraph looks like it is gathering into focus.
 */
export function GatheringText({ 
  text, 
  className = "",
  delayOffset = 0.2,
}: { 
  text: string; 
  className?: string;
  delayOffset?: number;
}) {
  const context = useSectionAnimation();
  const isTriggered = context ? context.isTriggered : true;
  const words = text.split(" ");
  
  return (
    <p className={`${className} flex flex-wrap`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.26em] last:mr-0"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={
            isTriggered
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 16, filter: "blur(10px)" }
          }
          transition={{
            duration: 0.75 + i * 0.025,
            delay: delayOffset + i * 0.015,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

/**
 * Utility for buttons, badges, and cards to smoothly enter when the section is triggered.
 */
export function FadeInUp({
  children,
  className = "",
  delay = 0.45,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const context = useSectionAnimation();
  const isTriggered = context ? context.isTriggered : true;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isTriggered
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
