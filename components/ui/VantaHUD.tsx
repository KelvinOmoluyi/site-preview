"use client";

import React, { useEffect, useState } from "react";
import { scrollController } from "@/lib/scrollStore";

export function VantaHUD() {
  const [progress, setProgress] = useState(0);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    let animId: number;

    const updateLoop = () => {
      setProgress(scrollController.getProgress());
      setHasPointer(scrollController.pointer.active);
      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const getPhaseName = (p: number) => {
    if (p < 0.2) return "FORMATION_V_RIGHT (HERO)";
    if (p < 0.45) return "DISASSEMBLING (ATOMIZATION)";
    if (p < 0.65) return "3D_SWARM (CROSS-VIEWPORT)";
    if (p < 0.85) return "CONVERGING (RE-ASSEMBLY)";
    return "FORMATION_V_LEFT (ASSEMBLED)";
  };

  const scrollToMilestone = (target: number) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalHeight * target,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-auto select-none">
      <div className="bg-[#0b0a13]/85 backdrop-blur-md border border-white/10 rounded-xl p-4 text-xs font-mono text-white/80 shadow-2xl shadow-black/80 max-w-xs space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="flex items-center gap-2 text-violet-400 font-semibold tracking-wider uppercase text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            VantaClip 3D Core
          </span>
          <span className="text-[10px] text-white/40">v1.0-alpha</span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between">
            <span className="text-white/50">Scroll Progress:</span>
            <span className="text-white font-medium">{(progress * 100).toFixed(1)}%</span>
          </div>

          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-500 to-indigo-400 h-full transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="flex justify-between pt-1">
            <span className="text-white/50">Phase:</span>
            <span className="text-violet-300 text-[10px] font-semibold truncate ml-2">
              {getPhaseName(progress)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">Pointer Disturbance:</span>
            <span className={hasPointer ? "text-emerald-400" : "text-white/40"}>
              {hasPointer ? "Active / Repelling" : "Equilibrium"}
            </span>
          </div>
        </div>

        {/* Milestone Quick Jump Controls */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5">
            Test Milestones
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: "V-Right", val: 0.05 },
              { label: "Break", val: 0.32 },
              { label: "Swarm", val: 0.55 },
              { label: "V-Left", val: 0.95 },
            ].map((m) => (
              <button
                key={m.label}
                onClick={() => scrollToMilestone(m.val)}
                className="py-1 px-1.5 bg-white/5 hover:bg-violet-600/30 hover:border-violet-500/40 border border-white/10 rounded text-[10px] text-white/70 hover:text-white transition-all text-center"
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
