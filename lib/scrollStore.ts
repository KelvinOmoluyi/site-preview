type ProgressListener = (progress: number, velocity: number) => void;

class ScrollProgressController {
  private progress: number = 0;
  private velocity: number = 0;
  private reducedMotion: boolean = false;
  private listeners: Set<ProgressListener> = new Set();

  // Pointer normalized coordinates [-1, 1] and viewport pixel coords
  public pointer = {
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    active: false,
  };

  public setProgress(val: number, velocity: number = 0) {
    this.progress = Math.max(0, Math.min(1, val));
    this.velocity = velocity;
    this.listeners.forEach((fn) => fn(this.progress, this.velocity));
  }

  public getProgress(): number {
    return this.progress;
  }

  public getVelocity(): number {
    return this.velocity;
  }

  public setReducedMotion(val: boolean) {
    this.reducedMotion = val;
  }

  public isReducedMotion(): boolean {
    return this.reducedMotion;
  }

  public updatePointer(clientX: number, clientY: number, innerWidth: number, innerHeight: number) {
    this.pointer.x = clientX;
    this.pointer.y = clientY;
    this.pointer.normalizedX = (clientX / innerWidth) * 2 - 1;
    this.pointer.normalizedY = -(clientY / innerHeight) * 2 + 1;
    this.pointer.active = true;
  }

  public clearPointer() {
    this.pointer.active = false;
  }

  public subscribe(fn: ProgressListener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }
}

export const scrollController = new ScrollProgressController();
