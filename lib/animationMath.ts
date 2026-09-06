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
 * 0.00 - 0.04: Formation Right (Hero state)
 * 0.04 - 0.17: Disassembly & Scatter into Swarm (traveling as user scrolls from Hero to Section 2)
 * 0.17 - 0.55: Full Scatter Swarm (Section 2 Trust/Budget, Section 3 How It Works, Section 4 Comparison)
 * 0.55 - 0.80: Swarm converging into Left V (Section 4 Comparison to Section 5 Why Brands Stay)
 * 0.80 - 1.00: Formation Left (Section 5 Why Brands Stay & Section 6 Booking)
 */
export function evaluateCubeAtProgress(
  cube: CubeData,
  progress: number,
  time: number,
  isReducedMotion: boolean = false
): CubeTransformState {
  const p = clamp(progress, 0, 1);

  // Reduced motion: smooth gentle glide without aggressive swarm or scatter
  if (isReducedMotion) {
    const t = smootherstep(0.04, 0.80, p);
    const pos = interpolateVector3(
      cube.states.formationRight.position,
      cube.states.formationLeft.position,
      t
    );
    const rot = interpolateVector3(
      cube.states.formationRight.rotation,
      cube.states.formationLeft.rotation,
      t
    );
    return {
      position: pos,
      rotation: rot,
      scale: 1.0,
    };
  }

  // Micro idle floating wave (alive in space)
  const idleY = Math.sin(time * 1.6 + cube.phase) * 0.06;
  const idleX = Math.cos(time * 1.2 + cube.phase) * 0.03;
  const idleRotX = Math.sin(time * 1.1 + cube.phase) * 0.04;
  const idleRotY = Math.cos(time * 1.4 + cube.phase) * 0.04;

  // Stagger calculation: each cube peels away slightly staggered by phase
  const staggerDelay = (Math.sin(cube.phase) * 0.5 + 0.5) * 0.04;

  const right = cube.states.formationRight;
  const scatter = cube.states.scatter;
  const left = cube.states.formationLeft;

  // Intermediate choreography stages:
  // Stage 2 (p = 0.40): Deep swirling scatter expansion across the center
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

  // Stage 3 (p = 0.60): Dispersal drifting toward the left half of the screen
  const scatterLeftPos: Vector3Tuple = [
    scatter.position[0] * 0.72 - 1.5 + Math.sin(cube.phase * 1.4) * 0.4,
    scatter.position[1] * 0.92 + Math.cos(cube.phase * 1.1) * 0.3,
    scatter.position[2] * 0.85,
  ];
  const scatterLeftRot: Vector3Tuple = [
    scatter.rotation[0] + 1.1,
    scatter.rotation[1] + 1.4,
    scatter.rotation[2] + 0.7,
  ];

  // Stage 5 (p = 1.00): Left V gracefully tilting to frame the final CTA card
  const leftFramedPos: Vector3Tuple = [
    left.position[0] - 0.2,
    left.position[1] - 0.15,
    left.position[2] - 0.3,
  ];
  const leftFramedRot: Vector3Tuple = [
    left.rotation[0] + 0.05,
    left.rotation[1] - 0.08,
    left.rotation[2],
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
    // Stage 2 -> 3: How It Works to Comparison (Swarm migrating toward left side)
    const t = smootherstep(0.40, 0.60, p);
    pos = interpolateVector3(scatterSwirlPos, scatterLeftPos, t);
    pos[0] += idleX * 2;
    pos[1] += idleY * 2;
    rot = interpolateVector3(scatterSwirlRot, scatterLeftRot, t);
    rot[0] += idleRotX * 3;
    rot[1] += idleRotY * 3;
    scale = scatter.scale;
  } else if (p < 0.80) {
    // Stage 3 -> 4: Comparison to Bento (Swarm converging into Left V)
    const t = smootherstep(0.60, 0.80 - staggerDelay, p);
    pos = arcVector3(scatterLeftPos, left.position, left.position, t);
    pos[0] += idleX * (2 - t);
    pos[1] += idleY * (2 - t);
    rot = interpolateVector3(scatterLeftRot, left.rotation, t);
    rot[0] += idleRotX * (3 - 2 * t);
    rot[1] += idleRotY * (3 - 2 * t);
    scale = lerp(scatter.scale, left.scale, t);
  } else {
    // Stage 4 -> 5: Bento to Booking (Left V perspective depth tilt)
    const t = smootherstep(0.80, 1.00, p);
    pos = interpolateVector3(left.position, leftFramedPos, t);
    pos[0] += idleX;
    pos[1] += idleY;
    rot = interpolateVector3(left.rotation, leftFramedRot, t);
    rot[0] += idleRotX;
    rot[1] += idleRotY;
    scale = left.scale;
  }

  return {
    position: pos,
    rotation: rot,
    scale,
  };
}
