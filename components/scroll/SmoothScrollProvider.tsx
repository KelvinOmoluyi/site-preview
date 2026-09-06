"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { scrollController } from "@/lib/scrollStore";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  vantaScene?: React.ReactNode;
}

/**
 * Custom Mobile + Desktop Fullpage Slide Engine.
 *
 * Fully customizable parameters:
 * - DURATION_MS: Duration of the slide transition in milliseconds
 * - EASING: Cubic-bezier curve for the slide transition
 * - MIN_SWIPE_PX: Minimum swipe distance to trigger section slide on touch devices
 * - WHEEL_THRESHOLD: Minimum wheel delta to trigger section slide on desktop
 */
export const SLIDE_CONFIG = {
  DURATION_MS: 1350, // Slower, cinematic transition giving cubes ample time to morph
  EASING: "cubic-bezier(0.16, 1, 0.3, 1)", // Silky smooth deceleration curve
  MIN_SWIPE_PX: 50,
  WHEEL_THRESHOLD: 30,
};

export const SECTION_IDS = [
  "hero",
  "trust",
  "how-it-works",
  "comparison",
  "why-brands-stay",
  "booking",
];

export function SmoothScrollProvider({ children, vantaScene }: SmoothScrollProviderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPanels = SECTION_IDS.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigateTo = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(targetIndex, totalPanels - 1));
      if (clamped === currentIndexRef.current || isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      const fromIndex = currentIndexRef.current;
      currentIndexRef.current = clamped;
      setCurrentIndex(clamped);

      // Continuously animate normalized progress [0.0, 1.0] across the entire slide duration
      const startProgress = totalPanels > 1 ? fromIndex / (totalPanels - 1) : 0;
      const targetProgress = totalPanels > 1 ? clamped / (totalPanels - 1) : 0;
      const startTime = performance.now();
      const duration = SLIDE_CONFIG.DURATION_MS;

      // Quartic ease-out matching the CSS transition
      const ease = (t: number) => 1 - Math.pow(1 - t, 4);

      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }

      const animateStep = (now: number) => {
        const elapsed = now - startTime;
        const rawT = Math.min(1, elapsed / duration);
        const easedT = ease(rawT);
        const currentP = startProgress + (targetProgress - startProgress) * easedT;

        scrollController.setProgress(currentP);

        if (rawT < 1) {
          animFrameRef.current = requestAnimationFrame(animateStep);
        } else {
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(animateStep);

      // Update section in controller and dispatch event
      scrollController.setSection(clamped);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, SLIDE_CONFIG.DURATION_MS + 60);
    },
    [totalPanels]
  );

  const navigate = useCallback(
    (direction: "up" | "down") => {
      if (direction === "down" && currentIndexRef.current < totalPanels - 1) {
        navigateTo(currentIndexRef.current + 1);
      } else if (direction === "up" && currentIndexRef.current > 0) {
        navigateTo(currentIndexRef.current - 1);
      }
    },
    [navigateTo, totalPanels]
  );

  // MOBILE: Native natural scroll listener
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      scrollController.setProgress(progress);

      // Determine active section for header styling
      let currentIdx = 0;
      const viewportCenter = scrollY + window.innerHeight * 0.35;
      SECTION_IDS.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= viewportCenter) {
          currentIdx = idx;
        }
      });
      scrollController.setSection(currentIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // DESKTOP: Wheel, Keyboard, and Slide controls
  useEffect(() => {
    if (isMobile) return;

    // Sync initial state
    scrollController.setProgress(0);
    scrollController.setSection(0);

    // 1. DESKTOP WHEEL LISTENER
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimatingRef.current) return;

      if (Math.abs(e.deltaY) >= SLIDE_CONFIG.WHEEL_THRESHOLD) {
        if (e.deltaY > 0) {
          navigate("down");
        } else {
          navigate("up");
        }
      }
    };

    // 2. KEYBOARD NAVIGATION
    const onKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        navigate("down");
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        navigate("up");
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobile, navigate]);

  // IN-PAGE ANCHOR LINK CLICK INTERCEPTION (Both Mobile and Desktop)
  useEffect(() => {
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetId = href.slice(1);
        const targetIndex = SECTION_IDS.indexOf(targetId);
        if (targetIndex !== -1) {
          e.preventDefault();
          if (isMobile) {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          } else {
            navigateTo(targetIndex);
          }
        }
      }
    };

    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("click", onAnchorClick);
    };
  }, [isMobile, navigateTo]);

  return (
    <div
      className={`custom-slider-viewport w-full relative ${
        isMobile ? "overflow-visible min-h-screen" : "h-screen h-[100svh] overflow-hidden"
      }`}
    >
      <div
        ref={containerRef}
        className={`custom-slider-container w-full ${
          isMobile ? "h-auto" : "h-full will-change-transform"
        }`}
        style={
          isMobile
            ? undefined
            : {
                transform: `translate3d(0, -${currentIndex * 100}%, 0)`,
                transition: `transform ${SLIDE_CONFIG.DURATION_MS}ms ${SLIDE_CONFIG.EASING}`,
              }
        }
      >
        {vantaScene && (
          <div
            className="fixed inset-0 pointer-events-none z-[5]"
            style={
              isMobile
                ? undefined
                : {
                    transform: `translate3d(0, ${currentIndex * 100}%, 0)`,
                    transition: `transform ${SLIDE_CONFIG.DURATION_MS}ms ${SLIDE_CONFIG.EASING}`,
                  }
            }
          >
            {vantaScene}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
