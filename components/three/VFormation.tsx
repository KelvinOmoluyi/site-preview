"use client";

import React, { useMemo } from "react";
import { buildCubeDataset } from "@/lib/formations";
import { FormationConfig, ScatterConfig } from "@/types/vanta";
import { CubeField } from "./CubeField";

interface VFormationProps {
  cubeCount?: number;
  formationConfig?: Partial<FormationConfig>;
  scatterConfig?: Partial<ScatterConfig>;
  isReducedPower?: boolean;
}

/**
 * High-level formation orchestrator for VantaClip.
 * Connects the mathematical formation models with the 3D CubeField engine.
 */
export function VFormation({
  cubeCount = 13,
  formationConfig,
  scatterConfig,
  isReducedPower = false,
}: VFormationProps) {
  // Generate stable dataset of cubes with formation target states
  const cubes = useMemo(() => {
    return buildCubeDataset(cubeCount, formationConfig, scatterConfig);
  }, [cubeCount, formationConfig, scatterConfig]);

  return <CubeField cubes={cubes} isReducedPower={isReducedPower} />;
}
