import { CubeData, CubeTransformState, Vector3Tuple } from "@/types/vanta";

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function smootherstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function interpolateVector3(
  a: Vector3Tuple,
  b: Vector3Tuple,
  t: number
): Vector3Tuple {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t),
  ];
}

/**
 * Calculates a natural physical arc between two 3D points
 * with an intermediate midpoint arch (giving travel depth).
 */
export function arcVector3(
  start: Vector3Tuple,
  mid: Vector3Tuple,
  end: Vector3Tuple,
  t: number
): Vector3Tuple {
  // Quadratic bezier through midpoint
  const oneMinusT = 1 - t;
  const t2 = t * t;
  const mt2 = oneMinusT * oneMinusT;
  const mt = 2 * oneMinusT * t;

  return [
    mt2 * start[0] + mt * mid[0] + t2 * end[0],
    mt2 * start[1] + mt * mid[1] + t2 * end[1],
    mt2 * start[2] + mt * mid[2] + t2 * end[2],
  ];
}

/**
 * Evaluates the exact transform state of a cube given the normalized scroll progress [0, 1]
 * and animation timestamp.
 * 
 * Timeline Milestones:
 * 0.00 - 0.20: Formation Right (Hero state) peeling into 3D scatter
 * 0.20 - 0.40: Section 1 Trust -> Section 2 How It Works (swirling scatter expansion)
 * 0.40 - 0.60: Section 2 How It Works -> Section 3 Comparison (dynamic cross-viewport swarm)
 * 0.60 - 0.80: Section 3 Comparison -> Section 4 Why Brands Stay (ambient bento background dispersion)
 * 0.80 - 1.00: Section 4 Why Brands Stay -> Section 5 Booking (full-viewport scatter framing the entire website)
 */
export function evaluateCubeAtProgress(
  cube: CubeData,
  progress: number,
  time: number,
  isReducedMotion: boolean = false
): CubeTransformState {
  const p = clamp(progress, 0, 1);

  const right = cube.states.formationRight;
  const scatter = cube.states.scatter;
  const finalScatter = cube.states.finalScatter;

  // Reduced motion: gentle glide off-screen in the final section
  if (isReducedMotion) {
    const tExit = smootherstep(0.75, 1.00, p);
    const pos = interpolateVector3(
      right.position,
      finalScatter.position,
      tExit
    );
    const rot = interpolateVector3(
      right.rotation,
      finalScatter.rotation,
      tExit
    );
    return {
      position: pos,
      rotation: rot,
      scale: lerp(right.scale, 0.0, tExit),
    };
  }

  // Micro idle floating wave (alive in space)
  const idleY = Math.sin(time * 1.6 + cube.phase) * 0.06;
  const idleX = Math.cos(time * 1.2 + cube.phase) * 0.03;
  const idleRotX = Math.sin(time * 1.1 + cube.phase) * 0.04;
  const idleRotY = Math.cos(time * 1.4 + cube.phase) * 0.04;

  // Stagger calculation: each cube peels away slightly staggered by phase
  const staggerDelay = (Math.sin(cube.phase) * 0.5 + 0.5) * 0.04;

  // Intermediate choreography stages:
  // Stage 1 (p = 0.40): Deep swirling scatter expansion across the center
  const scatterSwirlPos: Vector3Tuple = [
    scatter.position[0] * 1.12 + Math.sin(cube.phase) * 0.6,
    scatter.position[1] * 1.08 + Math.cos(cube.phase) * 0.5,
    scatter.position[2] + Math.sin(cube.phase * 2) * 0.8,
  ];
  const scatterSwirlRot: Vector3Tuple = [
    scatter.rotation[0] + 0.6,
    scatter.rotation[1] + 0.8,
    scatter.rotation[2] + 0.4,
  ];

  // Stage 2 (p = 0.60): Dispersal across comparison section
  // Displace cubes wider and lower/under the bento so they don't obstruct the header & subtitle text
  const rawMidX = scatter.position[0];
  const midSignX = rawMidX >= 0 ? 1 : -1;
  // Displace outward horizontally: minimum |x| around 3.8 to 5.8 units, framing the section from the sides
  const spreadMidX = midSignX * (3.8 + Math.abs(rawMidX) * 0.5) + Math.sin(cube.phase * 1.4) * 0.35;

  // Vertically: move cubes away from the central text corridor (|y| between -0.3 and 1.8)
  // Send some higher to the outer top flanks (y >= 2.2), and the majority down under/behind the bento (y <= -1.4)
  const rawMidY = scatter.position[1];
  let spreadMidY: number;
  if (rawMidY > 0.8) {
    // Upper outer flanks framing the header from the corners
    spreadMidY = 2.4 + Math.cos(cube.phase * 1.3) * 0.5;
  } else {
    // Under and behind the bento cards
    spreadMidY = -1.6 - Math.abs(rawMidY) * 0.8 + Math.sin(cube.phase * 1.6) * 0.4;
  }

  const scatterMidPos: Vector3Tuple = [
    spreadMidX,
    spreadMidY,
    scatter.position[2] * 0.85 + Math.sin(cube.phase * 1.8) * 0.5,
  ];
  const scatterMidRot: Vector3Tuple = [
    scatter.rotation[0] + 1.1,
    scatter.rotation[1] + 1.4,
    scatter.rotation[2] + 0.7,
  ];

  // Stage 3 (p = 0.80): Ambient background swarm around Bento section (Why Brands Stay)
  // Cubes gather back into a more compact, organic distribution floating under and around the Bento cards
  const scatterAmbientPos: Vector3Tuple = [
    scatter.position[0] * 1.05 + Math.sin(cube.phase * 1.7) * 0.4,
    scatter.position[1] * 1.02 + Math.cos(cube.phase * 1.3) * 0.35,
    scatter.position[2] * 0.90 + Math.sin(cube.phase * 2.1) * 0.5,
  ];
  const scatterAmbientRot: Vector3Tuple = [
    scatter.rotation[0] + 1.5,
    scatter.rotation[1] + 1.9,
    scatter.rotation[2] + 1.0,
  ];

  let pos: Vector3Tuple;
  let rot: Vector3Tuple;
  let scale: number;

  if (p < 0.20) {
    // Stage 0 -> 1: Hero to Trust (Peeling off Right V into Scatter)
    const t = smootherstep(0.00 + staggerDelay, 0.20, p);
    pos = arcVector3(right.position, scatter.position, scatter.position, t);
    pos[0] += idleX * (1 + t);
    pos[1] += idleY * (1 + t);
    rot = interpolateVector3(right.rotation, scatter.rotation, t);
    rot[0] += idleRotX * (1 + t * 2);
    rot[1] += idleRotY * (1 + t * 2);
    scale = lerp(right.scale, scatter.scale, t);
  } else if (p < 0.40) {
    // Stage 1 -> 2: Trust to How It Works (Scatter expanding & swirling across center)
    const t = smootherstep(0.20, 0.40, p);
    pos = interpolateVector3(scatter.position, scatterSwirlPos, t);
    pos[0] += idleX * 2;
    pos[1] += idleY * 2;
    rot = interpolateVector3(scatter.rotation, scatterSwirlRot, t);
    rot[0] += idleRotX * 3;
    rot[1] += idleRotY * 3;
    scale = scatter.scale;
  } else if (p < 0.60) {
    // Stage 2 -> 3: How It Works to Comparison (Swarm migrating across comparison)
    const t = smootherstep(0.40, 0.60, p);
    pos = interpolateVector3(scatterSwirlPos, scatterMidPos, t);
    pos[0] += idleX * 2;
    pos[1] += idleY * 2;
    rot = interpolateVector3(scatterSwirlRot, scatterMidRot, t);
    rot[0] += idleRotX * 3;
    rot[1] += idleRotY * 3;
    scale = scatter.scale;
  } else if (p < 0.80) {
    // Stage 3 -> 4: Comparison to Bento (Swarm dispersing into ambient background)
    const t = smootherstep(0.60, 0.80 - staggerDelay, p);
    pos = interpolateVector3(scatterMidPos, scatterAmbientPos, t);
    pos[0] += idleX * (2 - t);
    pos[1] += idleY * (2 - t);
    rot = interpolateVector3(scatterMidRot, scatterAmbientRot, t);
    rot[0] += idleRotX * (3 - 2 * t);
    rot[1] += idleRotY * (3 - 2 * t);
    scale = lerp(scatter.scale, 0.88, t);
  } else {
    // Stage 4 -> 5: Bento to Booking (Final section: Scatter COMPLETELY OUT of view of the website)
    const t = smootherstep(0.80, 1.00, p);
    pos = interpolateVector3(scatterAmbientPos, finalScatter.position, t);
    pos[0] += idleX * (1.2 - t * 1.2);
    pos[1] += idleY * (1.2 - t * 1.2);
    rot = interpolateVector3(scatterAmbientRot, finalScatter.rotation, t);
    rot[0] += idleRotX * (1.5 - t * 1.5);
    rot[1] += idleRotY * (1.5 - t * 1.5);
    scale = lerp(0.88, 0.0, t);
  }

  return {
    position: pos,
    rotation: rot,
    scale,
  };
}
