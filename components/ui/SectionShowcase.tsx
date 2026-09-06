"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  IconMegaphone,
  IconDocument,
  IconVideo,
  IconTrendingUp,
  IconShield,
  IconHandshake,
  IconUsers,
  IconZap,
  IconHeadphones,
  IconBarChart,
  IconCheck,
  IconX,
  IconInfo,
  IconArrowRight,
} from "./Icons";
import DarkVeil from "./DarkVeil";
import { WavyHeader, GatheringText, AnimatedSection, FadeInUp } from "./TextAnimations";

export function SectionShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [bentoMousePos, setBentoMousePos] = useState({ x: 0, y: 0 });
  const bentoGridRef = useRef<HTMLDivElement>(null);


  const handleBentoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (bentoGridRef.current) {
      const rect = bentoGridRef.current.getBoundingClientRect();
      setBentoMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const steps = [
    {
      num: "01",
      title: "You Launch a Campaign",
      desc: "Tell us your brand, goals, and budget. We turn it into a clear campaign brief.",
      icon: IconMegaphone,
      badge: "Onboarding & Strategy",
    },
    {
      num: "02",
      title: "Creators Get Guidelines",
      desc: "Our network of clippers receives your content and campaign guidelines.",
      icon: IconDocument,
      badge: "Clipper Coordination",
    },
    {
      num: "03",
      title: "Videos Get Published",
      desc: "Hundreds of short-form videos go live across TikTok, Reels, and Shorts.",
      icon: IconVideo,
      badge: "Multi-Platform Blast",
    },
    {
      num: "04",
      title: "You See the Results",
      desc: "Track organic reach, engagement, and performance across every clip.",
      icon: IconTrendingUp,
      badge: "Live Telemetry",
    },
  ];

  return (
    <div className="relative w-full text-white pointer-events-none select-none">
      {/* 2. HERO SECTION */}
      <AnimatedSection id="hero" index={0} className="snap-panel flex flex-col justify-center px-5 sm:px-10 md:px-14 lg:px-20 pt-24 sm:pt-28 pb-16 relative overflow-hidden">
        {/* React Bits DarkVeil Ambient Kinetic Shader Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <DarkVeil
            hueShift={338}
            speed={0.4}
            noiseIntensity={0.015}
            warpAmount={0.25}
            resolutionScale={0.5}
          />
          {/* Subtle bottom fade to blend smoothly into subsequent sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#050508] pointer-events-none" />
        </div>

        <div className="max-w-3xl pointer-events-auto space-y-6 relative z-10">
          {/* Headline */}
          <h1 
            className="flex flex-col text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] uppercase leading-[0.85] tracking-tight mt-3 mb-5 text-white drop-shadow-2xl" 
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">
                <WavyHeader text="TURN ONE" />
              </span>
              <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              </div>
            </div>
            <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)] mt-1">
              <WavyHeader text="CAMPAIGN" delayOffset={0.2} />
            </span>
            <span className="text-white mt-2 md:mt-3">
              <WavyHeader text="INTO THOUSANDS" delayOffset={0.4} />
            </span>
            <span className="text-white">
              <WavyHeader text="OF VIDEOS." delayOffset={0.6} />
            </span>
          </h1>

          {/* Subheadline */}
          <GatheringText 
            text="VantaClip connects brands with a network of creators who produce and distribute short-form videos across TikTok, Instagram Reels, and YouTube Shorts — helping businesses reach millions of people organically through authentic content."
            className="text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-2xl"
          />

          {/* CTA Group */}
          <FadeInUp delay={0.45} className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#booking"
              className="px-7 py-3.5 rounded-full font-medium text-sm text-white btn-complex-gradient hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-center"
            >
              Book Your Strategy Call
              <IconArrowRight className="w-4 h-4 text-purple-300" />
            </a>

            <a
              href="#how-it-works"
              className="px-7 py-3.5 rounded-full font-medium text-sm border border-white/10 bg-[#0c0a16] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-white/80 hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center text-center"
            >
              See How It Works
            </a>
          </FadeInUp>
        </div>
      </AnimatedSection>

      {/* 3. BUDGET ALERT & BENTO TRUST MATRIX */}
      <AnimatedSection id="trust" index={1} className="snap-panel flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-20 lg:py-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto w-full space-y-2.5 sm:space-y-3 pointer-events-auto relative z-10 my-auto">
          {/* 1. Top Campaign Budget Advisory Banner (Flat, Sleek, Solid) */}
          <div className="py-2.5 px-4 sm:px-5 rounded-xl bg-[#0e0a1c] border border-purple-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-15px_25px_-10px_rgba(147,51,234,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300">
                <IconInfo className="w-3.5 h-3.5" />
              </div>
              <GatheringText
                text="Campaigns require a minimum **$1,000 campaign budget** plus a separate VantaClip setup and management fee."
                className="text-xs sm:text-sm text-white/90 font-normal leading-snug"
                delayOffset={0.05}
              />
            </div>
            <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-[10px] font-mono text-purple-200 tracking-wider shrink-0 self-end sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              ADVISORY
            </div>
          </div>

          {/* 2. 5-Card Asymmetric Bento Grid (Tight Gaps, Flat, Varied Gradients & Inner Shadows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {/* Bento Card 1 (Wide 2-Columns): Official Content Rewards Partner (Diagonal Gradient + Bottom Ambient Shadow) */}
            <div className="sm:col-span-2 lg:col-span-2 p-5 sm:p-7 rounded-2xl bg-[#0a0714] bg-gradient-to-br from-[#180f33] via-[#0a0714] to-[#140a26] border border-purple-500/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),inset_0_-40px_50px_-20px_rgba(147,51,234,0.35),0_10px_25px_-10px_rgba(0,0,0,0.6)] hover:border-purple-400/50 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-45px_55px_-15px_rgba(168,85,247,0.45),0_15px_35px_-10px_rgba(0,0,0,0.8)] transition-all duration-400 flex flex-col justify-between group min-h-[160px] sm:min-h-[190px] relative overflow-hidden">
              {/* Giant Watermark VantaClip Logo */}
              <img 
                src="/logo.png" 
                alt="" 
                className="w-36 h-36 object-contain opacity-[0.06] absolute -bottom-6 -right-4 pointer-events-none group-hover:scale-105 group-hover:opacity-[0.1] transition-all duration-500 select-none" 
              />

              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-md shadow-purple-900/40 group-hover:scale-105 transition-transform">
                    <IconHandshake className="w-4 h-4" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-[11px] font-mono text-purple-200 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                    Verified Status
                  </div>
                </div>

                <span className="text-[11px] font-mono text-white/40 tracking-wider">
                  TIKTOK • REELS • SHORTS
                </span>
              </div>

              {/* Card Body with Enlarged Words */}
              <div className="space-y-1.5 pt-3 relative z-10">
                <h3 
                  className="text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-[0.9]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)]">
                    <WavyHeader text="OFFICIAL" delayOffset={0.05} />
                  </span>{" "}
                  <WavyHeader text="CONTENT REWARDS PARTNER" delayOffset={0.18} />
                </h3>
                <GatheringText
                  text="Direct platform integration granting priority algorithmic indexing and high-volume creator distribution."
                  className="text-xs sm:text-sm text-white/70 font-light max-w-lg leading-relaxed"
                  delayOffset={0.25}
                />
              </div>
            </div>

            {/* Bento Card 2 (1-Column): Secure Campaign Management (Radial Glow + Top-Right Inset Shadow) */}
            <div className="sm:col-span-2 lg:col-span-1 p-5 sm:p-7 rounded-2xl bg-[#0a0812] bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.22)_0%,#0a0812_70%)] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_20px_20px_45px_-15px_rgba(168,85,247,0.25),0_10px_25px_-10px_rgba(0,0,0,0.6)] hover:border-purple-400/50 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_25px_25px_50px_-10px_rgba(168,85,247,0.38),0_15px_35px_-10px_rgba(0,0,0,0.8)] transition-all duration-400 flex flex-col justify-between group min-h-[160px] sm:min-h-[190px] relative overflow-hidden">
              {/* Giant Watermark Shield */}
              <IconShield className="w-28 h-28 text-purple-400/10 absolute -bottom-5 -right-5 pointer-events-none group-hover:scale-105 group-hover:text-purple-400/15 transition-all duration-500 select-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-md shadow-purple-900/40 group-hover:scale-105 transition-transform">
                  <IconShield className="w-4 h-4" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-purple-300 uppercase tracking-wider">
                  Escrow Protected
                </span>
              </div>

              {/* Card Body */}
              <div className="space-y-1 pt-3 relative z-10">
                <h3 
                  className="text-2xl sm:text-3xl uppercase tracking-tight text-white leading-[0.9]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)]">
                    <WavyHeader text="SECURE" delayOffset={0.1} />
                  </span>{" "}
                  <WavyHeader text="MANAGEMENT" delayOffset={0.22} />
                </h3>
                <GatheringText
                  text="Rigorous contract guarantees, verified deliverables, and creator escrow protection."
                  className="text-xs sm:text-sm text-white/70 font-light leading-relaxed"
                  delayOffset={0.28}
                />
              </div>
            </div>

            {/* Bento Card 3 (1-Column): Transparent Reporting (Vertical Gradient + Bottom Inset Shadow) */}
            <div className="col-span-1 p-5 sm:p-6 rounded-2xl bg-[#07050d] bg-gradient-to-b from-[#0e0a1a] via-[#07050d] to-[#160b2c] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-35px_40px_-15px_rgba(126,34,206,0.32),0_10px_25px_-10px_rgba(0,0,0,0.6)] hover:border-purple-400/50 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-40px_50px_-12px_rgba(147,51,234,0.45),0_15px_35px_-10px_rgba(0,0,0,0.8)] transition-all duration-400 flex flex-col justify-between group min-h-[170px] sm:min-h-[185px] relative overflow-hidden">
              <IconBarChart className="w-24 h-24 text-purple-400/10 absolute -bottom-4 -right-4 pointer-events-none group-hover:scale-105 group-hover:text-purple-400/15 transition-all duration-500 select-none" />

              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                  <IconBarChart className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-purple-300/80 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20">
                  LIVE TELEMETRY
                </span>
              </div>

              <div className="space-y-1 pt-3 relative z-10">
                <h3 
                  className="text-xl sm:text-2xl uppercase tracking-tight text-white leading-[0.9]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)]">
                    <WavyHeader text="REAL-TIME" delayOffset={0.15} />
                  </span>{" "}
                  <WavyHeader text="REPORTING" delayOffset={0.26} />
                </h3>
                <GatheringText
                  text="Live dashboard tracking views, likes, and organic reach with zero fabricated metrics."
                  className="text-xs text-white/70 font-light leading-relaxed"
                  delayOffset={0.32}
                />
              </div>
            </div>

            {/* Bento Card 4 (1-Column): Performance Based Campaigns (Angled Gradient + Bottom-Right Inset Glow) */}
            <div className="col-span-1 p-5 sm:p-6 rounded-2xl bg-[#0a0812] bg-[linear-gradient(135deg,rgba(147,51,234,0.18)_0%,#0a0812_55%,#160a26_100%)] border border-purple-500/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_-25px_-25px_45px_-15px_rgba(168,85,247,0.3),0_10px_25px_-10px_rgba(0,0,0,0.6)] hover:border-purple-400/50 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_-30px_-30px_50px_-10px_rgba(168,85,247,0.42),0_15px_35px_-10px_rgba(0,0,0,0.8)] transition-all duration-400 flex flex-col justify-between group min-h-[170px] sm:min-h-[185px] relative overflow-hidden">
              <IconTrendingUp className="w-24 h-24 text-purple-400/10 absolute -bottom-4 -right-4 pointer-events-none group-hover:scale-105 group-hover:text-purple-400/15 transition-all duration-500 select-none" />

              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                  <IconTrendingUp className="w-4 h-4" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] font-mono text-emerald-300">
                  <span>+340%</span> LIFT
                </div>
              </div>

              <div className="space-y-1 pt-3 relative z-10">
                <h3 
                  className="text-xl sm:text-2xl uppercase tracking-tight text-white leading-[0.9]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)]">
                    <WavyHeader text="VIRAL" delayOffset={0.18} />
                  </span>{" "}
                  <WavyHeader text="VELOCITY" delayOffset={0.28} />
                </h3>
                <GatheringText
                  text="Engineered hooking frameworks ensuring maximum audience retention and conversion."
                  className="text-xs text-white/70 font-light leading-relaxed"
                  delayOffset={0.35}
                />
              </div>
            </div>

            {/* Bento Card 5 (1-Column): Professional Support (Bottom-Left Radial Glow + Inset Rim Vignette) */}
            <div className="sm:col-span-2 lg:col-span-1 p-5 sm:p-6 rounded-2xl bg-[#0a0812] bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.2)_0%,#0a0812_70%)] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_25px_-25px_45px_-15px_rgba(147,51,234,0.3),0_10px_25px_-10px_rgba(0,0,0,0.6)] hover:border-purple-400/50 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_30px_-30px_50px_-10px_rgba(168,85,247,0.42),0_15px_35px_-10px_rgba(0,0,0,0.8)] transition-all duration-400 flex flex-col justify-between group min-h-[160px] sm:min-h-[185px] relative overflow-hidden">
              <IconHeadphones className="w-24 h-24 text-purple-400/10 absolute -bottom-4 -right-4 pointer-events-none group-hover:scale-105 group-hover:text-purple-400/15 transition-all duration-500 select-none" />

              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                  <IconHeadphones className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-[10px] font-mono text-purple-200">
                  ⚡ &lt; 15m SLA
                </span>
              </div>

              <div className="space-y-1 pt-3 relative z-10">
                <h3 
                  className="text-xl sm:text-2xl uppercase tracking-tight text-white leading-[0.9]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)]">
                    <WavyHeader text="24/7" delayOffset={0.22} />
                  </span>{" "}
                  <WavyHeader text="STRATEGIST" delayOffset={0.3} />
                </h3>
                <GatheringText
                  text="Dedicated campaign managers and around-the-clock creator network operations."
                  className="text-xs text-white/70 font-light leading-relaxed"
                  delayOffset={0.38}
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. "HOW IT WORKS" // 4-STEP CHOREOGRAPHED PROCESS */}
      <AnimatedSection id="how-it-works" index={2} className="snap-panel px-4 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full space-y-8 sm:space-y-12 lg:space-y-16 relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 pointer-events-auto">
            <h2 
              className="flex flex-col text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem] uppercase leading-[0.85] tracking-tight mt-3 mb-4 text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span><WavyHeader text="FROM ONE CAMPAIGN TO" /></span>
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)] mt-1 md:mt-2">
                <WavyHeader text="THOUSANDS OF VIDEOS" delayOffset={0.2} />
              </span>
            </h2>
            <GatheringText 
              text="A simple, managed process that turns your content into organic reach across social platforms."
              className="text-sm sm:text-base lg:text-lg text-white/60 font-light mx-auto text-center max-w-xl"
            />
          </div>

          {/* 4 Interactive Steps Timeline in Bento Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pointer-events-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === index;
              const themes = [
                {
                  bg: "bg-[#0a0714] bg-gradient-to-br from-[#180f33] via-[#0a0714] to-[#140a26]",
                  shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),inset_0_-35px_45px_-18px_rgba(147,51,234,0.32),0_10px_25px_-10px_rgba(0,0,0,0.6)]",
                },
                {
                  bg: "bg-[#0a0812] bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.2)_0%,#0a0812_70%)]",
                  shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_20px_20px_40px_-15px_rgba(168,85,247,0.25),0_10px_25px_-10px_rgba(0,0,0,0.6)]",
                },
                {
                  bg: "bg-[#0a0812] bg-[linear-gradient(135deg,rgba(147,51,234,0.18)_0%,#0a0812_55%,#160a26_100%)]",
                  shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_-25px_-25px_40px_-15px_rgba(168,85,247,0.28),0_10px_25px_-10px_rgba(0,0,0,0.6)]",
                },
                {
                  bg: "bg-[#0a0812] bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.2)_0%,#0a0812_70%)]",
                  shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_25px_-25px_40px_-15px_rgba(147,51,234,0.28),0_10px_25px_-10px_rgba(0,0,0,0.6)]",
                },
              ];
              const theme = themes[index % themes.length];

              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${theme.bg} ${theme.shadow} ${
                    isActive
                      ? "border-purple-400/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-45px_50px_-15px_rgba(168,85,247,0.45),0_15px_35px_-10px_rgba(0,0,0,0.8)] scale-[1.02]"
                      : "border-white/10 hover:border-purple-400/40 hover:scale-[1.01]"
                  }`}
                >
                  <div className="space-y-3.5 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/35 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-purple-400 tracking-wider">
                        STEP {step.num}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <GatheringText 
                        text={step.title}
                        className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors"
                      />
                      <GatheringText 
                        text={step.desc}
                        className="text-xs text-white/70 leading-relaxed font-light"
                      />
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/40 relative z-10">
                    <span>{step.badge}</span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? "bg-purple-400 animate-pulse" : "bg-white/20"}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* 5. COMPARISON: "WHY CREATOR-DRIVEN BEATS TRADITIONAL ADVERTISING" */}
      <AnimatedSection id="comparison" index={3} className="snap-panel px-4 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full space-y-8 sm:space-y-12 relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Why This Works
            </div>
            <h2 
              className="flex flex-col text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem] uppercase leading-[0.85] tracking-tight mt-3 mb-4 text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span><WavyHeader text="WHY CREATOR-DRIVEN BEATS" /></span>
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)] mt-1 md:mt-2">
                <WavyHeader text="TRADITIONAL ADVERTISING" delayOffset={0.2} />
              </span>
            </h2>
            <GatheringText 
              text="Attention has shifted to short-form content. Here's why brands are moving their budgets accordingly."
              className="text-sm sm:text-base lg:text-lg text-white/60 font-light mx-auto text-center max-w-xl"
            />
          </div>

          {/* Comparative Cards in Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pointer-events-auto">
            {/* Card 1: Traditional Advertising (Dark Flat Matte Bento) */}
            <div className="p-5 sm:p-8 rounded-2xl border border-white/10 bg-[#07050d] bg-gradient-to-b from-[#100c1c] via-[#07050d] to-[#0d0918] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_-30px_35px_-15px_rgba(0,0,0,0.6),0_10px_25px_-10px_rgba(0,0,0,0.6)] space-y-5 sm:space-y-6 hover:border-white/20 transition-all duration-300">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                  Old Paradigm
                </span>
                <GatheringText 
                  text="Traditional Advertising"
                  className="text-xl font-bold text-white/90 uppercase tracking-wider"
                />
              </div>

              <ul className="space-y-3.5 text-sm text-white/60 font-light">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 text-red-400 mt-0.5">
                    <IconX className="w-3.5 h-3.5" />
                  </div>
                  <span>One polished ad, one message</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 text-red-400 mt-0.5">
                    <IconX className="w-3.5 h-3.5" />
                  </div>
                  <span>Paid impressions that stop when the budget does</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 text-red-400 mt-0.5">
                    <IconX className="w-3.5 h-3.5" />
                  </div>
                  <span>Feels like advertising</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 text-red-400 mt-0.5">
                    <IconX className="w-3.5 h-3.5" />
                  </div>
                  <span>Limited content volume</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Creator-Driven Campaigns (High Velocity Bento with Purple Inner Glow) */}
            <div className="p-6 sm:p-8 rounded-2xl border border-purple-500/40 bg-[#0b0816] bg-gradient-to-br from-[#1c1038] via-[#0b0816] to-[#160b2e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-40px_50px_-20px_rgba(147,51,234,0.4),0_15px_35px_-10px_rgba(0,0,0,0.8)] space-y-6 hover:border-purple-400/60 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-1.5 relative z-10">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-[11px] font-mono text-purple-300 uppercase tracking-widest">
                  ★ High Velocity
                </div>
                <GatheringText 
                  text="Creator-Driven Campaigns"
                  className="text-xl font-bold text-white uppercase tracking-wider"
                />
              </div>

              <ul className="space-y-3.5 text-sm text-white/90 font-normal relative z-10">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300 mt-0.5">
                    <IconCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Authentic content from real creators</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300 mt-0.5">
                    <IconCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Organic distribution that keeps compounding</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300 mt-0.5">
                    <IconCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Feels like a recommendation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300 mt-0.5">
                    <IconCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Hundreds of short-form videos per campaign</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 6. IMMERSIVE BENTO GRID: "WHY BRANDS CHOOSE VANTACLIP" */}
      <AnimatedSection id="why-brands-stay" index={4} className="snap-panel px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 lg:py-6 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full space-y-4 lg:space-y-4 relative z-10 my-auto">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-1.5 pointer-events-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-[11px] font-mono uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Why Brands Stay
            </div>
            <h2 
              className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] uppercase leading-[0.9] tracking-tight text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span><WavyHeader text="WHY BRANDS CHOOSE " /></span>
              <span className="text-transparent [-webkit-text-stroke:1.25px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:1.75px_rgba(255,255,255,0.8)]">
                <WavyHeader text="VANTACLIP" delayOffset={0.2} />
              </span>
            </h2>
            <GatheringText 
              text="More visibility, more creators talking about your product, and a clearer view of what's working."
              className="text-xs sm:text-sm text-white/60 font-light mx-auto text-center max-w-lg"
            />
          </div>

          {/* Interactive Bento Grid with Mouse Cursor Spotlight (2 Balanced Rows) */}
          <div
            ref={bentoGridRef}
            onMouseMove={handleBentoMouseMove}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 pointer-events-auto relative p-0.5 rounded-2xl"
            style={{
              background: `radial-gradient(700px circle at ${bentoMousePos.x}px ${bentoMousePos.y}px, rgba(168, 85, 247, 0.12), transparent 80%)`,
            }}
          >
            {/* Row 1, Bento Card 1: Access to a Creator Network (Spans 2 cols on sm & lg) */}
            <div className="sm:col-span-2 lg:col-span-2 p-4 sm:p-4.5 lg:p-5 rounded-2xl border border-purple-500/35 bg-[#0a0714] bg-gradient-to-br from-[#180f33] via-[#0a0714] to-[#140a26] shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),inset_0_-40px_50px_-20px_rgba(147,51,234,0.35),0_10px_25px_-10px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-3 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden relative">
              <div className="space-y-1.5 z-10">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/35 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                    <IconUsers className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-300/80 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20">
                    CREATOR POOL
                  </span>
                </div>
                <GatheringText 
                  text="Access to a Creator Network"
                  className="text-base sm:text-lg font-bold text-white leading-snug"
                />
                <GatheringText 
                  text="Tap into a managed network of clippers ready to turn your content into organic reach."
                  className="text-xs text-white/70 font-light max-w-md"
                />
              </div>

              {/* Interactive Visual: Live Creator Radar Widget */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/[0.08] shadow-inner flex items-center justify-between flex-wrap gap-2 z-10">
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2 overflow-hidden">
                    {["#a855f7", "#06b6d4", "#ec4899", "#8b5cf6"].map((col, i) => (
                      <div
                        key={i}
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0c0a16] flex items-center justify-center text-[9px] font-bold text-white shadow"
                        style={{ backgroundColor: col }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white text-[11px] sm:text-xs">1,240+ Active Clippers</div>
                    <div className="text-white/40 text-[10px]">Ready to ingest your footage</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Network Online
                </div>
              </div>
            </div>

            {/* Row 1, Bento Card 2: End-to-End Campaign Management (Spans 1 col on lg) */}
            <div className="p-3.5 sm:p-4.5 lg:p-5 rounded-2xl border border-white/10 bg-[#0a0812] bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.22)_0%,#0a0812_70%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_20px_20px_45px_-15px_rgba(168,85,247,0.25),0_10px_25px_-10px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-3 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/35 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                    <IconZap className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-300/80 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20">
                    FULL LIFECYCLE
                  </span>
                </div>
                <GatheringText 
                  text="End-to-End Campaign Management"
                  className="text-base sm:text-lg font-bold text-white leading-snug"
                />
                <GatheringText 
                  text="From strategy to execution, we handle creator coordination and distribution."
                  className="text-xs text-white/70 font-light"
                />
              </div>

              {/* Progress steps mini widget */}
              <div className="space-y-1 text-xs font-mono">
                {["01 Briefing", "02 Distribution", "03 Performance"].map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between px-2 py-1 rounded-lg bg-black/40 border border-white/[0.06]">
                    <span className="text-white/60 text-[10px]">{s}</span>
                    <span className="text-purple-400 font-semibold text-[10px]">✓ Automated</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2, Bento Card 3: Short-Form Content Expertise (Spans 1 col) */}
            <div className="col-span-1 p-3.5 sm:p-4.5 lg:p-5 rounded-2xl border border-white/10 bg-[#07050d] bg-gradient-to-b from-[#0e0a1a] via-[#07050d] to-[#160b2c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-35px_40px_-15px_rgba(126,34,206,0.32),0_10px_25px_-10px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-3 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/35 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                    <IconTrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-300/80 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20">
                    FORMAT EXPERTS
                  </span>
                </div>
                <GatheringText 
                  text="Short-Form Content Expertise"
                  className="text-base sm:text-lg font-bold text-white leading-snug"
                />
                <GatheringText 
                  text="We know what makes TikTok, Reels, and Shorts content perform across platforms."
                  className="text-xs text-white/70 font-light"
                />
              </div>

              {/* Platform metrics pills */}
              <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono">
                <div className="p-1.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div className="text-purple-300 font-bold text-[11px]">TikTok</div>
                  <div className="text-[9px] text-white/40">Hook Eng.</div>
                </div>
                <div className="p-1.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div className="text-purple-300 font-bold text-[11px]">Reels</div>
                  <div className="text-[9px] text-white/40">Audio Sync</div>
                </div>
                <div className="p-1.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div className="text-purple-300 font-bold text-[11px]">Shorts</div>
                  <div className="text-[9px] text-white/40">Retention</div>
                </div>
              </div>
            </div>

            {/* Row 2, Bento Card 4: Transparent Reporting (Spans 1 col) */}
            <div className="col-span-1 p-3.5 sm:p-4.5 lg:p-5 rounded-2xl border border-purple-500/25 bg-[#0a0812] bg-[linear-gradient(135deg,rgba(147,51,234,0.18)_0%,#0a0812_55%,#160a26_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_-25px_-25px_45px_-15px_rgba(168,85,247,0.3),0_10px_25px_-10px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-3 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/35 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                    <IconShield className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-300/80 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20">
                    VERIFIED ONLY
                  </span>
                </div>
                <GatheringText 
                  text="Transparent Reporting"
                  className="text-base sm:text-lg font-bold text-white leading-snug"
                />
                <GatheringText 
                  text="We only showcase verified outcomes — no fabricated statistics, no fake testimonials."
                  className="text-xs text-white/70 font-light"
                />
              </div>

              {/* Verified Badge */}
              <div className="p-2 rounded-xl bg-black/40 border border-purple-500/30 flex items-center justify-between text-xs font-mono">
                <span className="text-purple-300 text-[10px]">100% Real Analytics</span>
                <span className="text-emerald-400 font-bold text-[10px]">Audited</span>
              </div>
            </div>

            {/* Row 2, Bento Card 5: Professional Execution (Spans 1 col) */}
            <div className="sm:col-span-2 lg:col-span-1 p-3.5 sm:p-4.5 lg:p-5 rounded-2xl border border-white/10 bg-[#0a0812] bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.2)_0%,#0a0812_70%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_25px_-25px_45px_-15px_rgba(147,51,234,0.3),0_10px_25px_-10px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-3 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/35 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                    <IconBarChart className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-300/80 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20">
                    SLA ASSURED
                  </span>
                </div>
                <GatheringText 
                  text="Professional Execution"
                  className="text-base sm:text-lg font-bold text-white leading-snug"
                />
                <GatheringText 
                  text="Every campaign is planned, briefed, and managed with clear communication throughout."
                  className="text-xs text-white/70 font-light"
                />
              </div>

              {/* Service SLA Highlights */}
              <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono">
                <div className="p-1.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div className="text-purple-300 font-bold text-[11px]">&lt;24h</div>
                  <div className="text-[9px] text-white/40">Launch</div>
                </div>
                <div className="p-1.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div className="text-purple-300 font-bold text-[11px]">Slack</div>
                  <div className="text-[9px] text-white/40">Direct</div>
                </div>
                <div className="p-1.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div className="text-purple-300 font-bold text-[11px]">Weekly</div>
                  <div className="text-[9px] text-white/40">Audits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 7. HIGH-CONVERTING CLOSING STRATEGY CALL / CTA SECTION WITH INTEGRATED FOOTER */}
      <AnimatedSection id="booking" index={5} className="snap-panel px-4 sm:px-8 md:px-14 lg:px-20 pt-16 sm:pt-20 lg:pt-8 pb-6 sm:pb-8 lg:pb-4 flex flex-col justify-between relative">
        <div className="max-w-4xl mx-auto my-auto w-full rounded-2xl border border-purple-500/35 bg-[#06040c] bg-gradient-to-b from-[#180f33] via-[#0b0816] to-[#06040c] p-5 sm:p-8 md:p-10 text-center space-y-3 sm:space-y-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.16),inset_0_-40px_60px_-20px_rgba(147,51,234,0.35),0_20px_45px_-15px_rgba(0,0,0,0.85)] pointer-events-auto relative z-10 overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2.5 sm:space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-[11px] font-mono uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Scale Your Distribution
            </div>
            <h2 
              className="flex flex-col items-center text-[1.85rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] uppercase leading-[0.88] tracking-tight my-1 sm:my-2 text-white text-center"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span><WavyHeader text="READY TO TURN ONE CAMPAIGN" /></span>
              <span className="text-transparent [-webkit-text-stroke:1.25px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:1.75px_rgba(255,255,255,0.8)] mt-1">
                <WavyHeader text="INTO MILLIONS OF VIEWS?" delayOffset={0.2} />
              </span>
            </h2>
            <GatheringText 
              text="Schedule your strategy call with VantaClip today and let's map out your short-form distribution blueprint."
              className="text-xs sm:text-sm text-white/60 font-light max-w-lg mx-auto text-center"
            />
          </div>

          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              onClick={() => alert("Redirecting to VantaClip Strategy Call Booking calendar...")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-medium text-sm text-white btn-complex-gradient hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Book Your Strategy Call
              <IconArrowRight className="w-4 h-4 text-purple-300" />
            </button>
          </div>

          <div className="text-[11px] sm:text-xs font-mono text-white/40 pt-1 sm:pt-2 relative z-10">
            Starting at $1,000 Campaign Budget • Zero Risk Consultation
          </div>
        </div>

        {/* 8. FOOTER */}
        <footer className="w-full pt-4 pb-2 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/40 pointer-events-auto relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">VANTACLIP</span>
            <span> — CONCEPT EXPERIENCE · 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Discord</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Twitter / X</a>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  );
}
