"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneEnvironment } from "./SceneEnvironment";
import { VFormation } from "./VFormation";
import { ScenePostProcessing } from "./ScenePostProcessing";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { scrollController } from "@/lib/scrollStore";

export interface VantaSceneProps {
  cubeCount?: number;
  enablePostprocessing?: boolean;
  isReducedPower?: boolean;
}

/**
 * Top-level persistent R3F Canvas and 3D environment for VantaClip.
 * Stays mounted across all page sections while DOM content scrolls freely over it.
 */
export function VantaScene({
  cubeCount = 13,
  enablePostprocessing = true,
  isReducedPower = false,
}: VantaSceneProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Client-side mount check to prevent SSR hydration mismatch
  useEffect(() => {
    setIsMounted(true);

    // Global pointer tracking across the full page
    const handlePointerMove = (e: PointerEvent) => {
      scrollController.updatePointer(
        e.clientX,
        e.clientY,
        window.innerWidth,
        window.innerHeight
      );
    };

    const handlePointerLeave = () => {
      scrollController.clearPointer();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#060608]" />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
      aria-hidden="true"
    >
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 9.5], fov: 42, near: 0.1, far: 60 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <SceneEnvironment />
            <VFormation cubeCount={cubeCount} isReducedPower={isReducedPower} />
            <ScenePostProcessing enabled={enablePostprocessing && !isReducedPower} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
