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
 * Implements a decisive, direction-aware section scroll snap engine.
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
      duration: prefersReducedMotion ? 0.4 : 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.2,
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

    // --- STRONG DIRECTION-AWARE SECTION SNAP ENGINE ---
    let isProgrammaticScroll = false;
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let scrollDirection: 1 | -1 | 0 = 0; // 1 = down, -1 = up

    const onWheel = (e: WheelEvent) => {
      scrollDirection = e.deltaY > 0 ? 1 : -1;
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) > 5) {
        scrollDirection = deltaY > 0 ? 1 : -1;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        scrollDirection = 1;
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        scrollDirection = -1;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown, { passive: true });

    // Snap executor
    const performSnap = () => {
      if (isProgrammaticScroll) return;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(".snap-section")
      );
      if (sections.length === 0) return;

      const currentY = window.scrollY;
      const sectionTops = sections.map((sec) => {
        return sec.getBoundingClientRect().top + currentY;
      });

      // Check if already snapped within 10px of any section
      for (const top of sectionTops) {
        if (Math.abs(top - currentY) < 10) return;
      }

      // Find the segment [i, i+1] where currentY sits
      let i = 0;
      for (let j = 0; j < sectionTops.length - 1; j++) {
        if (currentY >= sectionTops[j] - 15 && currentY < sectionTops[j + 1] - 15) {
          i = j;
          break;
        }
      }
      if (currentY >= sectionTops[sectionTops.length - 1] - 15) {
        i = sectionTops.length - 1;
      }

      let targetIndex = i;
      if (i < sectionTops.length - 1) {
        const startY = sectionTops[i];
        const endY = sectionTops[i + 1];
        const span = endY - startY;
        const progress = span > 0 ? (currentY - startY) / span : 0;

        // Decisive directional lock:
        // If scrolling down and user passed at least 7% of current section, strongly snap to next
        if (scrollDirection === 1) {
          targetIndex = progress > 0.07 ? i + 1 : i;
        } else if (scrollDirection === -1) {
          // If scrolling up and user moved at least 7% back towards previous, strongly snap to previous
          targetIndex = progress < 0.93 ? i : i + 1;
        } else {
          targetIndex = progress > 0.5 ? i + 1 : i;
        }
      }

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const targetY = Math.min(sectionTops[targetIndex], maxScroll);

      if (Math.abs(targetY - currentY) > 10) {
        isProgrammaticScroll = true;
        lenis.scrollTo(targetY, {
          duration: 0.7,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            setTimeout(() => {
              isProgrammaticScroll = false;
              scrollDirection = 0;
            }, 60);
          },
        });
      }
    };

    // Synchronize Lenis scroll events with ScrollTrigger & trigger snap debounce
    lenis.on("scroll", () => {
      ScrollTrigger.update();

      if (isProgrammaticScroll) return;

      if (snapTimer) clearTimeout(snapTimer);
      // Fast 90ms debounce: as soon as the user's scroll gesture pauses, snap decisively
      snapTimer = setTimeout(() => {
        performSnap();
      }, 90);
    });

    // Global click listener to intercept anchor links and scroll smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hasAttribute("href")) {
        const href = anchor.getAttribute("href");
        if (href?.startsWith("#") && href.length > 1) {
          e.preventDefault();
          if (snapTimer) clearTimeout(snapTimer);
          isProgrammaticScroll = true;
          // Scroll very fast and smooth to the target section
          lenis.scrollTo(href, {
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => {
              setTimeout(() => {
                isProgrammaticScroll = false;
                scrollDirection = 0;
              }, 80);
            },
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      if (snapTimer) clearTimeout(snapTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", handleAnchorClick);
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
