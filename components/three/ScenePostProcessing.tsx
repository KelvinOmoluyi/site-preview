"use client";

import React from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

interface ScenePostProcessingProps {
  enabled?: boolean;
}

/**
 * Clean, high-end post-processing pipeline.
 * Removed pixel-shifting chromatic aberration to eliminate jagged/glitched edge fringes.
 */
export function ScenePostProcessing({ enabled = true }: ScenePostProcessingProps) {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={4} enableNormalPass={false}>
      {/* Subtle, soft specular bloom with high threshold to avoid noisy blowouts */}
      <Bloom
        luminanceThreshold={0.92}
        luminanceSmoothing={0.4}
        intensity={0.3}
        mipmapBlur
      />

      {/* Clean cinematic vignette for dark luxury focus */}
      <Vignette
        eskil={false}
        offset={0.3}
        darkness={0.7}
      />
    </EffectComposer>
  );
}
