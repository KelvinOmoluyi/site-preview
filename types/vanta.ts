export type Vector3Tuple = [number, number, number];

export interface CubeTransformState {
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: number;
}

export interface CubeData {
  id: number;
  initialPosition: Vector3Tuple;
  initialRotation: Vector3Tuple;
  scale: number;
  states: {
    formationRight: CubeTransformState;
    scatter: CubeTransformState;
    formationLeft: CubeTransformState;
  };
  phase: number;
  disturbanceFactor: number;
  jitterOffset: Vector3Tuple;
}

export interface FormationConfig {
  cubeCount: number;
  armLength: number;
  angleDeg: number;
  cubeSize: number;
  zSpread: number;
  xOffset: number;
  yOffset: number;
  tiltAngleXDeg: number;
  tiltAngleYDeg: number;
}

export interface ScatterConfig {
  xSpread: number;
  ySpread: number;
  zSpread: number;
  rotationSpread: number;
}

export interface ScrollState {
  progress: number;
  velocity: number;
  reducedMotion: boolean;
}
