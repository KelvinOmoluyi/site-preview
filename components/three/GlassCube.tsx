"use client";

import React, { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export interface GlassCubeProps {
  id: number;
  scale?: number;
  isReducedPower?: boolean;
}

/**
 * Custom-modeled indented cube loaded from Blender GLTF.
 * Calibrated with smooth satin roughness (0.14) to eliminate reflection noise and flickering.
 */
export const GlassCube = forwardRef<THREE.Group, GlassCubeProps>(
  ({ id, scale = 1.0, isReducedPower = false }, ref) => {
    const { nodes } = useGLTF("/models/inset_cube.glb") as any;

    const { geometry, material } = useMemo(() => {
      const mesh = nodes.Cube as THREE.Mesh;
      const originalMat = mesh?.material as THREE.MeshStandardMaterial;
      const mat = originalMat
        ? originalMat.clone()
        : new THREE.MeshStandardMaterial({ color: "#e300e7" });
      
      // Calibrate roughness to 0.14 so reflections are smooth and clean without noisy pixelation
      mat.roughness = 0.14;
      mat.metalness = 0.95;
      mat.needsUpdate = true;

      return {
        geometry: mesh?.geometry || new THREE.BoxGeometry(2, 2, 2),
        material: mat,
      };
    }, [nodes]);

    return (
      <group ref={ref} scale={scale} dispose={null}>
        <mesh
          geometry={geometry}
          material={material}
          scale={0.27}
          castShadow
          receiveShadow
        />
      </group>
    );
  }
);

useGLTF.preload("/models/inset_cube.glb");
GlassCube.displayName = "GlassCube";
