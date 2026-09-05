"use client";

import React, { useState, useRef } from "react";
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
      {/* 1. TOP NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between pointer-events-auto bg-transparent">
        <div className="flex items-center gap-3">
          {/* VantaClip Logo Icon */}
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center p-0.5 shadow-lg shadow-purple-600/30">
            <div className="w-full h-full bg-[#08070e] rounded-[6px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300 text-sm tracking-tighter">
              VC
            </div>
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white">
            VANTA<span className="text-violet-400 font-light">CLIP</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/60">
          <a href="#how-it-works" className="hover:text-violet-300 transition-colors">
            How It Works
          </a>
          <a href="#comparison" className="hover:text-violet-300 transition-colors">
            Why Us
          </a>
          <a href="#why-brands-stay" className="hover:text-violet-300 transition-colors">
            Network
          </a>
          <a href="#booking" className="hover:text-violet-300 transition-colors">
            Pricing
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="#booking"
            className="px-5 py-2.5 rounded-full font-medium text-xs bg-black border border-purple-500/50 text-white shadow-[inset_0_0_20px_rgba(168,85,247,0.3),0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[inset_0_0_30px_rgba(168,85,247,0.5),0_0_25px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 backdrop-blur-md"
          >
            Book Strategy Call
            <IconArrowRight className="w-3.5 h-3.5 text-purple-300" />
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="min-h-screen w-full flex flex-col justify-center px-6 md:px-14 lg:px-20 pt-28 pb-16 relative overflow-hidden">
        {/* React Bits DarkVeil Ambient Kinetic Shader Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <DarkVeil
            hueShift={338}
            speed={0.4}
            noiseIntensity={0.015}
            warpAmount={0.25}
            resolutionScale={1}
          />
          {/* Subtle bottom fade to blend smoothly into subsequent sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#050508] pointer-events-none" />
        </div>

        <div className="max-w-3xl pointer-events-auto space-y-6 relative z-10">
          {/* Headline */}
          <h1 
            className="flex flex-col text-[2.5rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] uppercase leading-[0.85] tracking-tight mt-3 mb-5 text-white drop-shadow-2xl" 
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">
                TURN ONE
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              </div>
            </div>
            <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)] mt-1">
              CAMPAIGN
            </span>
            <span className="text-white mt-2 md:mt-3">
              INTO THOUSANDS
            </span>
            <span className="text-white">
              OF VIDEOS.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base text-white/60 font-light leading-relaxed max-w-2xl">
            VantaClip connects brands with a network of creators who produce and distribute short-form videos across TikTok, Instagram Reels, and YouTube Shorts — helping businesses reach millions of people organically through authentic content.
          </p>

          {/* CTA Group */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="px-7 py-3.5 rounded-full font-medium text-sm bg-black border border-purple-500/50 text-white shadow-[inset_0_0_20px_rgba(168,85,247,0.3),0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[inset_0_0_30px_rgba(168,85,247,0.5),0_0_25px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 backdrop-blur-md"
            >
              Book Your Strategy Call
              <IconArrowRight className="w-4 h-4 text-purple-300" />
            </a>

            <a
              href="#how-it-works"
              className="px-7 py-3.5 rounded-full font-medium text-sm border border-white/10 bg-black/50 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md text-white/80 hover:bg-white/5 hover:border-white/20 transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Subtle scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono tracking-widest uppercase flex items-center gap-2 pointer-events-none">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400/80 animate-ping shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          Scroll to explore the architecture
        </div>
      </section>

      {/* 3. BUDGET ALERT & TRUST BADGES */}
      <section className="w-full px-6 md:px-14 lg:px-20 py-12">
        <div className="max-w-5xl mx-auto space-y-6 pointer-events-auto">
          {/* Campaign Budget Alert Box */}
          <div className="p-4 sm:p-5 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-violet-950/20 to-purple-950/40 backdrop-blur-xl flex items-center gap-3.5 shadow-xl shadow-purple-950/30">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 text-purple-300">
              <IconInfo className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-white/80 font-normal leading-snug">
              Campaigns require a minimum <strong className="text-white font-semibold">$1,000 campaign budget</strong> plus a separate VantaClip setup and management fee.
            </p>
          </div>

          {/* Trust Badges Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: "Official Content Rewards Partner", icon: IconHandshake },
              { label: "Secure Campaign Management", icon: IconShield },
              { label: "Transparent Reporting", icon: IconBarChart },
              { label: "Performance Based Campaigns", icon: IconTrendingUp },
              { label: "Professional Support", icon: IconHeadphones },
            ].map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div
                  key={idx}
                  className="px-3.5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex items-center gap-2.5 text-xs text-white/70 hover:border-purple-500/40 hover:text-white transition-all group"
                >
                  <IconComp className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="leading-tight font-medium">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. "HOW IT WORKS" // 4-STEP CHOREOGRAPHED PROCESS */}
      <section id="how-it-works" className="w-full min-h-screen px-6 md:px-14 lg:px-20 py-24 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full space-y-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              How It Works
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              From One Campaign to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                Thousands of Videos
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light">
              A simple, managed process that turns your content into organic reach across social platforms.
            </p>
          </div>

          {/* 4 Interactive Steps Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pointer-events-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isActive
                      ? "border-purple-500/60 bg-gradient-to-b from-purple-950/40 to-violet-950/20 shadow-2xl shadow-purple-900/30 scale-[1.02]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-purple-400 tracking-wider">
                        STEP {step.num}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>{step.badge}</span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? "bg-purple-400 animate-pulse" : "bg-white/20"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Kinetic Choreography Indicator */}
          <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md max-w-xl mx-auto text-center pointer-events-auto text-xs font-mono text-white/50">
            <span className="text-purple-300 font-semibold">Choreography Note:</span> As you scroll through these steps, the 3D V-nodes scatter across the screen and converge into the left-hand position.
          </div>
        </div>
      </section>

      {/* 5. COMPARISON: "WHY CREATOR-DRIVEN BEATS TRADITIONAL ADVERTISING" */}
      <section id="comparison" className="w-full min-h-screen px-6 md:px-14 lg:px-20 py-24 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Why This Works
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Why Creator-Driven Beats <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400">
                Traditional Advertising
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light">
              Attention has shifted to short-form content. Here&apos;s why brands are moving their budgets accordingly.
            </p>
          </div>

          {/* Comparative Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
            {/* Card 1: Traditional Advertising */}
            <div className="p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl space-y-7 opacity-80 hover:opacity-100 transition-opacity">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                  Old Paradigm
                </span>
                <h3 className="text-xl font-bold text-white/90 uppercase tracking-wider">
                  Traditional Advertising
                </h3>
              </div>

              <ul className="space-y-4 text-sm text-white/60 font-light">
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

            {/* Card 2: Creator-Driven Campaigns */}
            <div className="p-8 rounded-3xl border border-purple-500/50 bg-gradient-to-b from-purple-950/40 via-violet-950/30 to-[#0c0918] backdrop-blur-xl space-y-7 shadow-2xl shadow-purple-900/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-[11px] font-mono text-purple-300 uppercase tracking-widest">
                  ★ High Velocity
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                  Creator-Driven Campaigns
                </h3>
              </div>

              <ul className="space-y-4 text-sm text-white/90 font-normal">
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
      </section>

      {/* 6. IMMERSIVE BENTO GRID: "WHY BRANDS CHOOSE VANTACLIP" */}
      <section id="why-brands-stay" className="w-full min-h-screen px-6 md:px-14 lg:px-20 py-24 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Why Brands Stay
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Why Brands Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400">
                VantaClip
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light">
              More visibility, more creators talking about your product, and a clearer view of what&apos;s working.
            </p>
          </div>

          {/* Interactive Bento Grid with Mouse Cursor Spotlight */}
          <div
            ref={bentoGridRef}
            onMouseMove={handleBentoMouseMove}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pointer-events-auto relative p-1 rounded-3xl"
            style={{
              background: `radial-gradient(700px circle at ${bentoMousePos.x}px ${bentoMousePos.y}px, rgba(168, 85, 247, 0.12), transparent 80%)`,
            }}
          >
            {/* Bento Card 1: Access to a Creator Network (Spans 2 cols on lg) */}
            <div className="lg:col-span-2 p-8 rounded-3xl border border-white/[0.09] bg-[#0c0a16]/80 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-purple-500/50 transition-all group overflow-hidden relative">
              <div className="space-y-3 z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <IconUsers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Access to a Creator Network</h3>
                <p className="text-sm text-white/70 font-light max-w-md">
                  Tap into a managed network of clippers ready to turn your content into organic reach.
                </p>
              </div>

              {/* Interactive Visual: Live Creator Radar Widget */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between flex-wrap gap-4 z-10">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden">
                    {["#a855f7", "#06b6d4", "#ec4899", "#8b5cf6"].map((col, i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0c0a16] flex items-center justify-center text-[10px] font-bold text-white shadow"
                        style={{ backgroundColor: col }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white">1,240+ Active Clippers</div>
                    <div className="text-white/40">Ready to ingest your footage</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Network Online
                </div>
              </div>
            </div>

            {/* Bento Card 2: End-to-End Campaign Management */}
            <div className="p-8 rounded-3xl border border-white/[0.09] bg-[#0c0a16]/80 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-purple-500/50 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <IconZap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">End-to-End Campaign Management</h3>
                <p className="text-sm text-white/70 font-light">
                  From strategy to execution, we handle creator coordination, content distribution, and performance tracking.
                </p>
              </div>

              {/* Progress steps mini widget */}
              <div className="space-y-2 text-xs font-mono">
                {["01 Briefing", "02 Distribution", "03 Performance"].map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-white/60">{s}</span>
                    <span className="text-purple-400 font-semibold">✓ Automated</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Card 3: Short-Form Content Expertise */}
            <div className="p-8 rounded-3xl border border-white/[0.09] bg-[#0c0a16]/80 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-purple-500/50 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <IconTrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Short-Form Content Expertise</h3>
                <p className="text-sm text-white/70 font-light">
                  We know what makes TikTok, Reels, and Shorts content perform — and apply it to every campaign.
                </p>
              </div>

              {/* Platform metrics pills */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-purple-300 font-bold">TikTok</div>
                  <div className="text-[10px] text-white/40">Hook Eng.</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-purple-300 font-bold">Reels</div>
                  <div className="text-[10px] text-white/40">Audio Sync</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-purple-300 font-bold">Shorts</div>
                  <div className="text-[10px] text-white/40">Retention</div>
                </div>
              </div>
            </div>

            {/* Bento Card 4: Transparent Reporting */}
            <div className="p-8 rounded-3xl border border-white/[0.09] bg-[#0c0a16]/80 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-purple-500/50 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <IconShield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Transparent Reporting</h3>
                <p className="text-sm text-white/70 font-light">
                  We only showcase verified outcomes — no fabricated statistics, no fake testimonials, ever.
                </p>
              </div>

              {/* Verified Badge */}
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between text-xs font-mono">
                <span className="text-purple-300">100% Real Analytics</span>
                <span className="text-emerald-400 font-bold">Audited</span>
              </div>
            </div>

            {/* Bento Card 5: Professional Execution (Spans 2 cols on lg) */}
            <div className="lg:col-span-2 p-8 rounded-3xl border border-white/[0.09] bg-[#0c0a16]/80 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-purple-500/50 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <IconBarChart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Professional Execution</h3>
                <p className="text-sm text-white/70 font-light max-w-lg">
                  Every campaign is planned, briefed, and managed with clear communication from start to finish.
                </p>
              </div>

              {/* Service SLA Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1">
                  <div className="text-white font-semibold">&lt;24h Deployment</div>
                  <div className="text-white/40 font-mono">Fast campaign ramp-up</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1">
                  <div className="text-white font-semibold">Direct Slack/Discord</div>
                  <div className="text-white/40 font-mono">Real-time team channel</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1">
                  <div className="text-white font-semibold">Weekly Growth Audit</div>
                  <div className="text-white/40 font-mono">Iterative hook tuning</div>
                </div>
              </div>
            </div>

            {/* Bento Card 6: Official Content Rewards Partner (Full width bottom highlight) */}
            <div className="lg:col-span-3 p-8 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-[#0d0a1c]/80 to-purple-950/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-purple-400/60 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/30">
                  <IconHandshake className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Official Content Rewards Partner</h3>
                  <p className="text-sm text-white/70 font-light max-w-xl">
                    Our partnership gives your campaigns credibility and access built on an established platform.
                  </p>
                </div>
              </div>

              <div className="px-5 py-2.5 rounded-full border border-purple-400/40 bg-purple-500/10 text-purple-200 text-xs font-mono uppercase tracking-widest shrink-0">
                Verified Platform Status
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH-CONVERTING CLOSING STRATEGY CALL / CTA SECTION */}
      <section id="booking" className="w-full px-6 md:px-14 lg:px-20 py-28 relative">
        <div className="max-w-4xl mx-auto rounded-3xl border border-purple-500/40 bg-gradient-to-b from-purple-950/40 via-[#0e0a1e]/90 to-[#06050a] p-8 sm:p-14 text-center space-y-8 backdrop-blur-2xl shadow-2xl shadow-purple-950/50 pointer-events-auto relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Scale Your Distribution
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Ready to turn one campaign into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                millions of organic views?
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light max-w-xl mx-auto">
              Schedule your strategy call with VantaClip today and let&apos;s map out your short-form distribution blueprint.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => alert("Redirecting to VantaClip Strategy Call Booking calendar...")}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-sm bg-black border border-purple-500/50 text-white shadow-[inset_0_0_20px_rgba(168,85,247,0.3),0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[inset_0_0_30px_rgba(168,85,247,0.5),0_0_25px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 backdrop-blur-md"
            >
              Book Your Strategy Call
              <IconArrowRight className="w-4 h-4 text-purple-300" />
            </button>
          </div>

          <div className="text-xs font-mono text-white/40 pt-4 relative z-10">
            Starting at $1,000 Campaign Budget • Zero Risk Consultation
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="w-full px-6 md:px-14 lg:px-20 py-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-wider">VANTACLIP</span>
          <span>© 2026. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Discord</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Twitter / X</a>
        </div>
      </footer>
    </div>
  );
}
