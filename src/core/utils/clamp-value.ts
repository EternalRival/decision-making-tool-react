export default function clampValue(min: number, current: number, max: number): number {
  return Math.max(min, Math.min(current, max));
}
