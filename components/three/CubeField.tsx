"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CubeData, Vector3Tuple } from "@/types/vanta";
import { evaluateCubeAtProgress } from "@/lib/animationMath";
import { scrollController } from "@/lib/scrollStore";
import { GlassCube } from "./GlassCube";

interface CubeFieldProps {
  cubes: CubeData[];
  isReducedPower?: boolean;
}

interface DisturbanceState {
  currentPos: Vector3Tuple;
  targetPos: Vector3Tuple;
  currentRot: Vector3Tuple;
  targetRot: Vector3Tuple;
}

/**
 * High-performance 3D field managing all cubes, their scroll interpolation,
 * and real-time pointer disturbance physics in a single consolidated useFrame loop.
 */
export function CubeField({ cubes, isReducedPower = false }: CubeFieldProps) {
  const { viewport, camera } = useThree();
  const cubeRefs = useRef<(THREE.Group | null)[]>([]);

  // Damped scroll progress to ensure silky smooth momentum
  const currentProgress = useRef(0);
  const isReducedMotion = useRef(false);

  // Per-cube physics disturbance state
  const disturbanceStates = useMemo<DisturbanceState[]>(() => {
    return cubes.map(() => ({
      currentPos: [0, 0, 0],
      targetPos: [0, 0, 0],
      currentRot: [0, 0, 0],
      targetRot: [0, 0, 0],
    }));
  }, [cubes]);

  // Responsive scale factor based on viewport width
  const responsiveScale = useMemo(() => {
    if (viewport.width < 7) {
      // Mobile / narrow screen
      return 0.52;
    } else if (viewport.width < 11) {
      // Tablet
      return 0.82;
    }
    // Desktop
    return 1.0;
  }, [viewport.width]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = mediaQuery.matches;
    scrollController.setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
      scrollController.setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Raycaster plane to compute 3D pointer position
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointerVec = useMemo(() => new THREE.Vector2(), []);
  const planeZ = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const intersectionPoint = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const targetP = scrollController.getProgress();
    // Responsive tracking of the continuous slide transition
    currentProgress.current += (targetP - currentProgress.current) * Math.min(1, delta * 18);

    const time = state.clock.getElapsedTime();
    const pointer = scrollController.pointer;

    // Project pointer onto Z=0 plane in world coordinates
    let hasPointerIntersection = false;
    if (pointer.active) {
      pointerVec.set(pointer.normalizedX, pointer.normalizedY);
      raycaster.setFromCamera(pointerVec, camera);
      hasPointerIntersection = !!raycaster.ray.intersectPlane(planeZ, intersectionPoint);
    }

    const disturbanceRadius = 2.8 * responsiveScale;
    const maxPushDistance = 1.05 * responsiveScale;

    // Update each cube's position, rotation, and pointer disturbance
    for (let i = 0; i < cubes.length; i++) {
      const cube = cubes[i];
      const mesh = cubeRefs.current[i];
      if (!mesh) continue;

      const distState = disturbanceStates[i];

      // 1. Evaluate base state from scroll progress
      const baseTransform = evaluateCubeAtProgress(
        cube,
        currentProgress.current,
        time,
        isReducedMotion.current
      );

      let baseX = baseTransform.position[0];
      let baseY = baseTransform.position[1];
      let baseZ = baseTransform.position[2];

      if (viewport.width < 7) {
        // MOBILE VIEWPORT ADAPTATIONS:
        // 1. Center the Hero V-formation horizontally at x = 0 (instead of desktop offset x = +3.4)
        // Smoothly fade out the centering offset as the user scrolls into section 1 (p: 0 -> 0.18)
        const heroCenterOffset = (1 - Math.min(1, currentProgress.current / 0.18)) * 3.4;
        const uncenteredX = baseTransform.position[0] - heroCenterOffset;

        // 2. Scale scatter coordinates horizontally so cubes stay framed within mobile screen width
        const mobileXRatio = Math.min(1.0, (viewport.width / 12.0) * 1.5);
        baseX = uncenteredX * responsiveScale * mobileXRatio;

        // 3. Lower the hero formation slightly so it sits beautifully below the headline text
        const heroYOffset = (1 - Math.min(1, currentProgress.current / 0.18)) * -0.5;
        baseY = (baseTransform.position[1] + heroYOffset) * responsiveScale;
        baseZ = baseTransform.position[2] * responsiveScale;
      } else {
        // DESKTOP & TABLET: Standard scaling
        baseX = baseTransform.position[0] * responsiveScale;
        baseY = baseTransform.position[1] * responsiveScale;
        baseZ = baseTransform.position[2] * responsiveScale;
      }

      // 2. Compute pointer disturbance physics (repulsion + spatial wave)
      if (hasPointerIntersection && !isReducedMotion.current) {
        const dx = baseX - intersectionPoint.x;
        const dy = baseY - intersectionPoint.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = disturbanceRadius * disturbanceRadius;

        if (distSq < radiusSq && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const normalizedDist = dist / disturbanceRadius;
          // Quadratic smooth falloff
          const falloff = Math.pow(1 - normalizedDist, 1.8) * cube.disturbanceFactor;

          const pushMag = falloff * maxPushDistance;
          const nx = dx / dist;
          const ny = dy / dist;

          // Push outwards in X/Y plane
          distState.targetPos[0] = nx * pushMag;
          distState.targetPos[1] = ny * pushMag;
          // Alternate push forward/back along Z based on cube phase for deep 3D dispersal
          distState.targetPos[2] = Math.sin(cube.phase * 3) * (pushMag * 1.2);

          // Add torque / rotation based on repulsion vector
          distState.targetRot[0] = -ny * pushMag * 0.8;
          distState.targetRot[1] = nx * pushMag * 0.8;
          distState.targetRot[2] = (nx + ny) * pushMag * 0.4;
        } else {
          // Reset target disturbance to zero
          distState.targetPos[0] = 0;
          distState.targetPos[1] = 0;
          distState.targetPos[2] = 0;
          distState.targetRot[0] = 0;
          distState.targetRot[1] = 0;
          distState.targetRot[2] = 0;
        }
      } else {
        // Pointer inactive or out of bounds -> spring back to equilibrium
        distState.targetPos[0] = 0;
        distState.targetPos[1] = 0;
        distState.targetPos[2] = 0;
        distState.targetRot[0] = 0;
        distState.targetRot[1] = 0;
        distState.targetRot[2] = 0;
      }

      // 3. Smoothly damp disturbance offsets back to target (spring relaxation)
      const dampSpeed = Math.min(1, delta * 6);
      distState.currentPos[0] += (distState.targetPos[0] - distState.currentPos[0]) * dampSpeed;
      distState.currentPos[1] += (distState.targetPos[1] - distState.currentPos[1]) * dampSpeed;
      distState.currentPos[2] += (distState.targetPos[2] - distState.currentPos[2]) * dampSpeed;

      distState.currentRot[0] += (distState.targetRot[0] - distState.currentRot[0]) * dampSpeed;
      distState.currentRot[1] += (distState.targetRot[1] - distState.currentRot[1]) * dampSpeed;
      distState.currentRot[2] += (distState.targetRot[2] - distState.currentRot[2]) * dampSpeed;

      // 4. Combine base scroll transform + pointer disturbance offset
      // CRITICAL: Pointer interaction never modifies base scroll state
      mesh.position.set(
        baseX + distState.currentPos[0],
        baseY + distState.currentPos[1],
        baseZ + distState.currentPos[2]
      );

      mesh.rotation.set(
        baseTransform.rotation[0] + distState.currentRot[0],
        baseTransform.rotation[1] + distState.currentRot[1],
        baseTransform.rotation[2] + distState.currentRot[2]
      );

      const targetScale = Math.max(0, baseTransform.scale * responsiveScale);
      mesh.scale.set(targetScale, targetScale, targetScale);
      mesh.visible = targetScale > 0.001;
    }
  });

  return (
    <group name="vanta-cube-field">
      {cubes.map((cube, index) => (
        <GlassCube
          key={cube.id}
          id={cube.id}
          ref={(el) => {
            cubeRefs.current[index] = el;
          }}
          isReducedPower={isReducedPower}
        />
      ))}
    </group>
  );
}
