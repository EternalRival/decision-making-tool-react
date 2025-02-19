export function clampValue(min: number, current: number, max: number): number {
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }

  return Math.max(min, Math.min(current, max));
}
