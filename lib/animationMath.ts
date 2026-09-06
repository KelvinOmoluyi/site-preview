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

  let pos: Vector3Tuple;
  let rot: Vector3Tuple;
  let scale: number;

  if (p <= 0.04) {
    // Section 1 (Hero): Firmly in Right V Formation
    const right = cube.states.formationRight;
    pos = [
      right.position[0] + idleX,
      right.position[1] + idleY,
      right.position[2],
    ];
    rot = [
      right.rotation[0] + idleRotX,
      right.rotation[1] + idleRotY,
      right.rotation[2],
    ];
    scale = right.scale;
  } else if (p < 0.17) {
    // Scroll Transition from Hero to Section 2: Breaking apart from Right V into Scatter
    const startRange = 0.04 + staggerDelay;
    const endRange = 0.17;
    const t = smootherstep(startRange, endRange, p);

    const right = cube.states.formationRight;
    const scatter = cube.states.scatter;

    pos = arcVector3(right.position, scatter.position, scatter.position, t);
    pos[0] += idleX * (1 + t);
    pos[1] += idleY * (1 + t);

    rot = interpolateVector3(right.rotation, scatter.rotation, t);
    rot[0] += idleRotX * (1 + t * 2);
    rot[1] += idleRotY * (1 + t * 2);

    scale = lerp(right.scale, scatter.scale, t);
  } else if (p < 0.55) {
    // Sections 2, 3, 4 (Trust/Budget, How It Works, Comparison): Fully Scattered
    const scatter = cube.states.scatter;
    pos = [
      scatter.position[0] + idleX * 2,
      scatter.position[1] + idleY * 2,
      scatter.position[2],
    ];
    rot = [
      scatter.rotation[0] + idleRotX * 3,
      scatter.rotation[1] + idleRotY * 3,
      scatter.rotation[2],
    ];
    scale = scatter.scale;
  } else if (p < 0.80) {
    // Sections 4 to 5: Traveling across the viewport and converging towards Left V
    const startRange = 0.55;
    const endRange = 0.80 - staggerDelay;
    const t = smootherstep(startRange, endRange, p);

    const scatter = cube.states.scatter;
    const left = cube.states.formationLeft;

    pos = arcVector3(scatter.position, scatter.position, left.position, t);
    pos[0] += idleX * (2 - t);
    pos[1] += idleY * (2 - t);

    rot = interpolateVector3(scatter.rotation, left.rotation, t);
    rot[0] += idleRotX * (3 - 2 * t);
    rot[1] += idleRotY * (3 - 2 * t);

    scale = lerp(scatter.scale, left.scale, t);
  } else {
    // Section 5 & 6 (Why Brands Stay & Booking): Firmly in Left V Formation
    const left = cube.states.formationLeft;
    pos = [
      left.position[0] + idleX,
      left.position[1] + idleY,
      left.position[2],
    ];
    rot = [
      left.rotation[0] + idleRotX,
      left.rotation[1] + idleRotY,
      left.rotation[2],
    ];
    scale = left.scale;
  }

  return {
    position: pos,
    rotation: rot,
    scale,
  };
}
