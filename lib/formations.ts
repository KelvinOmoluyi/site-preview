import {
  CubeData,
  CubeTransformState,
  FormationConfig,
  ScatterConfig,
  Vector3Tuple,
} from "@/types/vanta";

export const DEFAULT_FORMATION_CONFIG: FormationConfig = {
  cubeCount: 13,
  armLength: 4.6,
  angleDeg: 58,
  cubeSize: 0.54,
  zSpread: 0.0,
  xOffset: 3.4,
  yOffset: 0.0,
  tiltAngleXDeg: 6,
  tiltAngleYDeg: 15,
};

export const DEFAULT_SCATTER_CONFIG: ScatterConfig = {
  xSpread: 6.8,
  ySpread: 4.4,
  zSpread: 3.5,
  rotationSpread: Math.PI * 1.2,
};

/**
 * Rotates a 3D point by Euler angles [rx, ry, rz] in radians.
 */
function rotatePoint(
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number
): Vector3Tuple {
  // Rotate around X
  const y1 = y * Math.cos(rx) - z * Math.sin(rx);
  const z1 = y * Math.sin(rx) + z * Math.cos(rx);

  // Rotate around Y
  const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
  const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);

  // Rotate around Z
  const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
  const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);

  return [x3, y3, z2];
}

/**
 * Generates coordinate states for a clean, non-intersecting V formation.
 * Uses 1 central vertex cube at the bottom point, with symmetrically spaced cubes
 * along the left and right arms separated by clear negative space.
 */
export function generateVFormation(
  side: "right" | "left",
  configOverride?: Partial<FormationConfig>
): CubeTransformState[] {
  const cfg: FormationConfig = { ...DEFAULT_FORMATION_CONFIG, ...configOverride };
  const { cubeCount, angleDeg, xOffset, yOffset, tiltAngleXDeg, tiltAngleYDeg } = cfg;

  const results: CubeTransformState[] = [];
  const halfAngleRad = ((angleDeg / 2) * Math.PI) / 180;
  const sinA = Math.sin(halfAngleRad);
  const cosA = Math.cos(halfAngleRad);

  const tiltYRad = ((side === "right" ? -tiltAngleYDeg : tiltAngleYDeg) * Math.PI) / 180;
  const tiltXRad = (tiltAngleXDeg * Math.PI) / 180;
  const sideX = side === "right" ? xOffset : -xOffset;

  // Symmetrical distribution:
  // Index 0: Bottom vertex cube
  // Indices 1 .. leftCount: Left arm ascending
  // Indices (leftCount + 1) .. (cubeCount - 1): Right arm ascending
  const remainingCubes = Math.max(1, cubeCount - 1);
  const leftCount = Math.floor(remainingCubes / 2);
  const rightCount = remainingCubes - leftCount;
  const maxPerArm = Math.max(leftCount, rightCount);

  // Spacing between cube centers: 0.76 units (with cube size 0.54, gap is 0.22 units)
  const stepDistance = 0.76;
  const topY = maxPerArm * stepDistance * cosA;
  const vVerticalCenter = topY / 2;

  for (let i = 0; i < cubeCount; i++) {
    let rawX = 0;
    let rawY = 0;
    let armRotZ = 0;

    if (i === 0) {
      // Vertex cube at the bottom point
      rawX = 0;
      rawY = -vVerticalCenter;
      armRotZ = 0;
    } else if (i <= leftCount) {
      // Left arm ascending from bottom to top
      const armIndex = i; // 1 to leftCount
      const dist = armIndex * stepDistance;
      rawX = -dist * sinA;
      rawY = dist * cosA - vVerticalCenter;
      armRotZ = halfAngleRad; // Aligned along arm slope
    } else {
      // Right arm ascending from bottom to top
      const armIndex = i - leftCount; // 1 to rightCount
      const dist = armIndex * stepDistance;
      rawX = dist * sinA;
      rawY = dist * cosA - vVerticalCenter;
      armRotZ = -halfAngleRad; // Aligned along arm slope
    }

    // Keep cubes on the clean plane to prevent intersection
    const rawZ = 0;

    // Apply the 3D viewing angle tilt (faces slightly inward)
    const [rotX, rotY, rotZ] = rotatePoint(rawX, rawY, rawZ, tiltXRad, tiltYRad, 0);

    const posX = rotX + sideX;
    const posY = rotY + yOffset;
    const posZ = rotZ;

    // Clean, aligned rotation: combine arm orientation with overall 3D scene tilt
    const rotXTotal = tiltXRad;
    const rotYTotal = tiltYRad;
    const rotZTotal = armRotZ;

    results.push({
      position: [posX, posY, posZ],
      rotation: [rotXTotal, rotYTotal, rotZTotal],
      scale: 1.0,
    });
  }

  return results;
}

/**
 * Generates coordinate states for the mid-scroll scatter / swarm formation.
 * Cubes disperse cleanly across the viewport in deep 3D coordinates.
 */
export function generateScatterFormation(
  count: number,
  configOverride?: Partial<ScatterConfig>
): CubeTransformState[] {
  const cfg: ScatterConfig = { ...DEFAULT_SCATTER_CONFIG, ...configOverride };
  const { xSpread, ySpread, zSpread, rotationSpread } = cfg;

  const results: CubeTransformState[] = [];

  for (let i = 0; i < count; i++) {
    // Deterministic golden spiral distribution for even, non-colliding coverage
    const normalized = (i + 0.5) / count;
    const phi = i * 2.399963229728653; // Golden angle

    // Center across viewport with sinusoidal jitter
    const xBase = (normalized - 0.5) * xSpread;
    const xJitter = Math.sin(phi * 2.7 + i) * 0.5;
    const posX = xBase + xJitter;

    // Vertical spacing
    const posY = Math.sin(phi * 1.8) * (ySpread * 0.45);

    // Deep Z depth
    const posZ = Math.cos(phi * 3.3 + i * 1.2) * (zSpread * 0.45);

    // Controlled 3D tumbling
    const rotX = Math.sin(phi * 1.2) * rotationSpread;
    const rotY = Math.cos(phi * 1.5) * rotationSpread;
    const rotZ = Math.sin(phi * 1.9) * (rotationSpread * 0.6);

    const scale = 0.95;

    results.push({
      position: [posX, posY, posZ],
      rotation: [rotX, rotY, rotZ],
      scale,
    });
  }

  return results;
}

/**
 * Generates coordinate states for the final section scatter formation.
 * Cubes scatter completely out of view of the website in all directions
 * (moving far beyond the viewport bounds) with scale fading to 0.
 */
export const FINAL_SCATTER_POSITIONS: Vector3Tuple[] = [
  [18.0, 12.0, -2.0],   // 0: Far Top-Right (off-screen)
  [20.0, 6.0, 2.0],     // 1: Upper-Right (off-screen)
  [20.0, -5.0, -2.0],   // 2: Lower-Right (off-screen)
  [18.0, -12.0, 1.0],   // 3: Far Bottom-Right (off-screen)
  [-18.0, 12.0, -2.0],  // 4: Far Top-Left (off-screen)
  [-20.0, 6.0, 2.0],    // 5: Upper-Left (off-screen)
  [-20.0, -5.0, -1.0],  // 6: Lower-Left (off-screen)
  [-18.0, -12.0, 1.0],  // 7: Far Bottom-Left (off-screen)
  [-10.0, 16.0, -3.0],  // 8: High Top-Left (off-screen)
  [10.0, 16.0, -2.0],   // 9: High Top-Right (off-screen)
  [-8.0, -16.0, -1.0],  // 10: Deep Bottom-Left (off-screen)
  [8.0, -16.0, -2.0],   // 11: Deep Bottom-Right (off-screen)
  [0.0, 18.0, 5.0],     // 12: High Center ejection (off-screen)
];

export const FINAL_SCATTER_ROTATIONS: Vector3Tuple[] = [
  [1.2, -1.6, 0.8],
  [-0.9, 1.8, -1.2],
  [1.4, 0.9, 1.5],
  [-1.2, -0.8, 1.1],
  [1.1, 1.5, -0.9],
  [-1.0, -1.4, 1.2],
  [1.5, -0.9, -1.3],
  [-0.8, 1.2, 0.6],
  [0.7, -0.9, 1.6],
  [-0.6, 1.3, -1.4],
  [1.2, -0.6, 0.8],
  [-0.9, 0.8, -1.1],
  [1.4, 1.6, 0.5],
];

export const FINAL_SCATTER_SCALES: number[] = [
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
];

export function generateFinalScatterFormation(count: number): CubeTransformState[] {
  const results: CubeTransformState[] = [];
  for (let i = 0; i < count; i++) {
    const pos = FINAL_SCATTER_POSITIONS[i % FINAL_SCATTER_POSITIONS.length];
    const rot = FINAL_SCATTER_ROTATIONS[i % FINAL_SCATTER_ROTATIONS.length];
    const scale = FINAL_SCATTER_SCALES[i % FINAL_SCATTER_SCALES.length];
    results.push({
      position: [pos[0], pos[1], pos[2]],
      rotation: [rot[0], rot[1], rot[2]],
      scale,
    });
  }
  return results;
}

/**
 * Builds the complete dataset of 13 cubes with stable identities and non-overlapping targets.
 */
export function buildCubeDataset(
  count: number = DEFAULT_FORMATION_CONFIG.cubeCount,
  formationOverride?: Partial<FormationConfig>,
  scatterOverride?: Partial<ScatterConfig>
): CubeData[] {
  const rightStates = generateVFormation("right", { cubeCount: count, ...formationOverride });
  const scatterStates = generateScatterFormation(count, scatterOverride);
  const finalScatterStates = generateFinalScatterFormation(count);
  const leftStates = generateVFormation("left", { cubeCount: count, ...formationOverride });

  const dataset: CubeData[] = [];

  for (let i = 0; i < count; i++) {
    const right = rightStates[i];
    const scatter = scatterStates[i];
    const finalScatter = finalScatterStates[i];
    const left = leftStates[i];

    const phase = (i / count) * Math.PI * 2;
    const disturbanceFactor = 0.9 + 0.3 * Math.sin(i * 2.3);
    const jitterOffset: Vector3Tuple = [0, 0, 0];

    dataset.push({
      id: i,
      initialPosition: right.position,
      initialRotation: right.rotation,
      scale: 1.0,
      states: {
        formationRight: right,
        scatter: scatter,
        formationLeft: left,
        finalScatter: finalScatter,
      },
      phase,
      disturbanceFactor,
      jitterOffset,
    });
  }

  return dataset;
}
