"use client";

import React, { useEffect, useRef } from "react";
import { scrollController } from "@/lib/scrollStore";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Native CSS Scroll Snap Provider for VantaClip.
 * 
 * Replaces JS scroll hijackers (Lenis) with 100% native CSS scroll snap:
 * - Container uses `scroll-snap-type: y mandatory` and `scroll-behavior: smooth`.
 * - Sections use `scroll-snap-align: start` and `scroll-snap-stop: always`.
 * - Native browser scrolling runs on the compositor thread with zero input lag.
 * - Normalized scroll progress [0.0, 1.0] is observed and sent to the 3D scene.
 * - In-page anchor clicks smoothly glide to the target section in the snap container.
 * - Arrow keys / Page keys navigate section-by-section.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const progress = maxScroll > 0 ? container.scrollTop / maxScroll : 0;
        scrollController.setProgress(progress);
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    // Initial sync
    handleScroll();

    // Intercept in-page anchor clicks to scroll smoothly within the container
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector<HTMLElement>(href);
        if (targetElement && container.contains(targetElement)) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Keyboard navigation: step through sections on ArrowDown / ArrowUp / PageDown / PageUp
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      const sections = Array.from(container.querySelectorAll<HTMLElement>(".snap-section"));
      if (sections.length === 0) return;

      const currentScroll = container.scrollTop;

      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        const next = sections.find((s) => s.offsetTop > currentScroll + 15);
        if (next) next.scrollIntoView({ behavior: "smooth" });
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        const prev = [...sections].reverse().find((s) => s.offsetTop < currentScroll - 15);
        if (prev) prev.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      container.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="vanta-scroll-container"
      className="scroll-snap-page relative w-full"
    >
      {children}
    </div>
  );
}
