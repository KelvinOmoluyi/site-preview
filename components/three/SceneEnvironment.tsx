"use client";

import React from "react";
import { Environment } from "@react-three/drei";

/**
 * Clean, lightweight cinematic studio lighting for VantaClip.
 * Fast single-pass execution without multi-buffer overhead.
 */
export function SceneEnvironment() {
  return (
    <>
      {/* Deep obsidian ambient light */}
      <ambientLight color="#0e0b1c" intensity={1.2} />

      {/* Primary Key light */}
      <directionalLight
        position={[6, 8, 8]}
        intensity={2.6}
        color="#ffffff"
      />

      {/* Soft Front-Fill light */}
      <directionalLight
        position={[-6, 4, 6]}
        intensity={1.2}
        color="#e0e7ff"
      />

      {/* Signature VantaClip Rim 1: Violet back edge */}
      <directionalLight
        position={[-8, -4, -6]}
        intensity={3.4}
        color="#9333ea"
      />

      {/* Signature VantaClip Rim 2: Cool cyan edge */}
      <directionalLight
        position={[8, -5, -7]}
        intensity={2.0}
        color="#38bdf8"
      />

      {/* Point lights for facet highlights */}
      <pointLight position={[3.5, 0, 2]} intensity={1.5} color="#c084fc" distance={8} decay={2} />
      <pointLight position={[-3.5, 0, 2]} intensity={1.5} color="#818cf8" distance={8} decay={2} />

      {/* Clean studio environment producing soft, continuous white studio reflections */}
      <Environment preset="studio" environmentIntensity={0.85} />
    </>
  );
}
