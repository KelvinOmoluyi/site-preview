"use client";

import React, { useState, useEffect } from "react";
import { IconArrowRight } from "./Icons";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number; isScrolled: boolean }>;
      if (customEvent.detail) {
        setIsScrolled(customEvent.detail.isScrolled);
      }
    };
    window.addEventListener("vanta-section-change", handleSectionChange);
    return () => window.removeEventListener("vanta-section-change", handleSectionChange);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-2 sm:py-2.5 md:py-3 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-purple-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.7)]"
          : "bg-transparent backdrop-blur-none border-b border-transparent"
      }`}
    >
      <div className="flex items-center">
        <a href="#hero" className="inline-block focus:outline-none">
          <img
            src="/logo.png"
            alt="VantaClip"
            className="h-6 sm:h-7 md:h-8 w-auto object-contain drop-shadow-md hover:opacity-90 transition-opacity"
          />
        </a>
      </div>

      {/* Desktop Nav Links */}
      <nav className="hidden md:flex items-center gap-7 text-[11px] font-mono uppercase tracking-widest text-white/60">
        <a href="#comparison" className="hover:text-purple-300 transition-colors">
          Why Us
        </a>
        <a href="#how-it-works" className="hover:text-purple-300 transition-colors">
          How It Works
        </a>
        <a href="#why-brands-stay" className="hover:text-purple-300 transition-colors">
          Network
        </a>
        <a href="#booking" className="hover:text-purple-300 transition-colors">
          Pricing
        </a>
      </nav>

      {/* CTA Button */}
      <div className="flex items-center gap-3">
        <a
          href="#booking"
          className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full font-medium text-xs text-white btn-complex-gradient hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>Book <span className="hidden sm:inline">Strategy</span> Call</span>
          <IconArrowRight className="w-3.5 h-3.5 text-purple-300" />
        </a>
      </div>
    </header>
  );
}
