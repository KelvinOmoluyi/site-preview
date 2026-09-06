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
  const sectionRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const checkTrigger = () => {
      if (!scrollController.isSiteLoaded) {
        return;
      }
      // Trigger if desktop current section matches
      if (scrollController.currentSection === index) {
        setIsTriggered(true);
        return;
      }
      // On mobile natural scroll, trigger if section is in/near viewport
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          setIsTriggered(true);
        }
      }
    };

    // Check immediately
    checkTrigger();

    window.addEventListener("vanta-site-loaded", checkTrigger);
    window.addEventListener("vanta-section-change", checkTrigger);
    window.addEventListener("scroll", checkTrigger, { passive: true });

    // IntersectionObserver for mobile natural scrolling
    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window && sectionRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsTriggered(true);
            }
          });
        },
        { rootMargin: "100px 0px" }
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("vanta-site-loaded", checkTrigger);
      window.removeEventListener("vanta-section-change", checkTrigger);
      window.removeEventListener("scroll", checkTrigger);
      if (observer) observer.disconnect();
    };
  }, [index]);

  return (
    <SectionAnimationContext.Provider value={{ isTriggered }}>
      <section ref={sectionRef} id={id} className={className}>
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
  
  // Parse words and detect if words are wrapped in ** ... **
  const rawWords = text.split(" ");
  let boldActive = false;
  const words = rawWords.map((raw) => {
    let word = raw;
    let bold = boldActive;
    if (word.startsWith("**")) {
      bold = true;
      boldActive = true;
      word = word.slice(2);
    }
    if (word.endsWith("**")) {
      word = word.slice(0, -2);
      boldActive = false;
    }
    return { word, bold };
  });
  
  return (
    <p className={className}>
      {words.map(({ word, bold }, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.26em] last:mr-0 ${bold ? "text-white font-semibold underline decoration-purple-400/60 underline-offset-4" : ""}`}
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
